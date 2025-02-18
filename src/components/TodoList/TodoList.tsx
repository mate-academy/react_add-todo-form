import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../App';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} dataId={todo.id} />
    ))}
  </section>
);
