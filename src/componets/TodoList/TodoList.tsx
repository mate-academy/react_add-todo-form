import { TodoWithUser } from '../../types/typesdef';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

interface Props {
  todos: TodoWithUser[]
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li className="todo-list__item" key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
