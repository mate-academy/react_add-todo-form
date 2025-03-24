import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  }[];
};
export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          user={todo.user}
          data-id={todo.id}
        />
      ))}
    </section>
  );
};

export default TodoList;
