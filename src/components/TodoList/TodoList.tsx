import { TodoInfo } from '../TodoInfo';

import './TodoList.scss';

 type Props = {
   preparedTodos: Todo[];
 };

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="mt-5 list">
    {preparedTodos.map(todo => (
      <li key={todo.id} className="message column is-one-third">
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
