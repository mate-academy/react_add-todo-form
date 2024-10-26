import '../../App.scss';

import React from 'react';
import { Todo, User } from '../../types'; // Import types
import classNames from 'classnames';

interface TodoInfoProps {
  todo: Todo;
  users: User[];
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, users }) => {
  const user = users.find(findUser => findUser.id === todo.userId);

  return (
    <li
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <a href={`mailto:${user?.email}`} className="UserInfo">
        {user?.name}
      </a>
    </li>
  );
};
