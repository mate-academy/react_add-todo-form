import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
