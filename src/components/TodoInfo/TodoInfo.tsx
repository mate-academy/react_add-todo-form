import React from 'react';

import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';

import './TodoInfo.scss';

export const TodoInfo: React.FC<Todo> = React.memo(
  ({ title, completed, user }) => (
    <div className="todo">
      <div className="todo__info">
        <h2 className="todo__title">{title}</h2>
      </div>

      <div className="todo__progress">
        {
          completed
            ? <img className="todo__image" src="./images/done.png" alt="completed" />
            : <img className="todo__image" src="./images/in_progress.png" alt="in progress" />
        }
      </div>
      {user && <UserInfo {...user} />}
    </div>
  ),
);
