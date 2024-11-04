import { ITodoInfo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: { todos: ITodoInfo[] }) => (
  <section className="TodoList">
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  </section>
);
