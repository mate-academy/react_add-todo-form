import React from 'react';
import { User } from '../../types/User';

import './TodoInfo.scss';

type Props = {
  title: string,
  completed: boolean,
  user: User | null,
};

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => (
  <div className="todo">
    <div>
      <span className="todo__title">
        Title:
        {' '}
      </span>
      {title}
    </div>

    <div>
      <span className="todo__title">
        Status:
        {' '}
      </span>
      {completed ? 'DONE' : 'in progress...'}
    </div>

    <div>
      <span className="todo__title">
        Assigned:
        {' '}
      </span>
      {user?.name}
      {' '}
    </div>
    <a href="mailto:{user.email}">e-mail</a>
  </div>
);
