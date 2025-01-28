import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
