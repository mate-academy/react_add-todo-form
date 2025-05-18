import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/types';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          title={todo.title}
          completedStatus={todo.completed}
          userId={todo.userId}
          user={todo.user}
          id={todo.id}
        />
      ))}
    </section>
  );
};
