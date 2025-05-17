import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/user';
import { Todo } from '../../types/todo';

interface TodoListProps {
  todos: (Todo & { user: User })[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
