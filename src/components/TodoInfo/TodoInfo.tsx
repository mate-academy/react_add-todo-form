import React from 'react';

import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/ToDo';

import './TodoInfo.scss';

export const TodoInfo: React.FC<Todo> = React.memo(
  ({ title, completed, user }) => (
    <div className="todoIn">
      <div className="todoIn__info">
        <h2 className="todoIn__title">{title}</h2>
      </div>

      <div className="todoIn__progress">
        {
          completed
            ? '👍'
            : '👆'
        }
      </div>
      {user && <UserInfo {...user} />}
    </div>
  ),
);
