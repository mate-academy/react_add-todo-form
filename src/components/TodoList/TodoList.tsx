import { UserInfo } from '../UserInfo';
import { TodolistInfo } from '../TodoInfo';

import './TodoList.scss';
import { Todo } from '../../Types';

type Props = {
  prepTD: Todo[];
};

export const TodoList: React.FC<Props> = ({ prepTD }) => (
  <ul
    className="TodoList"
  >
    {prepTD.map((todo: Todo) => (
      <li
        key={todo.id}
        className="TodoList__item"
      >
        <UserInfo
          user={todo.user}
        />
        <TodolistInfo
          todo={todo}
        />
      </li>
    ))}
  </ul>
);
