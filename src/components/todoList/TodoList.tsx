import { TodoInfo } from '../todoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

import './TodoList.scss';

type Props = {
  preparedTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <div className="container">
    <ul>
      {preparedTodos.map(todo => (
        <li className="todoList" key={todo.id}>
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  </div>
);
