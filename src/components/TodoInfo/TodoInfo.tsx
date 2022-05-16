import classNames from 'classnames';
import React from 'react';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo/UserInfo';

import './TodoInfo.scss';

type Props = {
  title: string,
  completed: boolean,
  user: User | null,
};

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => (
  <div
    className={classNames('todo', { 'todo--completed': completed })}
  >
    <p className="todo__title">{title}</p>
    <p className="todo__completed">
      Status:
      {completed ? ' Completed' : ' Not completed'}
    </p>
    {user && (
      <UserInfo
        name={user.name}
        email={user.email}
      />
    )}
  </div>
);
