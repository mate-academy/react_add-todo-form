import React from 'react';
import { Todos } from '../../types/Todos';
import { UserInfo } from '../UserInfo';

type Props = Pick<Todos, 'user' | 'title' | 'completed'>;

export const TodoInfo: React.FC<Props> = ({ user, title, completed }) => {
  return (
    <div className="todoItem">
      <h2 className="todoItem__title">{title}</h2>
      <label>
        Done:
        <input
          type="checkbox"
          className="todoItem__checkbox-input"
          defaultChecked={completed}
        />
      </label>

      {user && (
        <UserInfo
          name={user.name}
          username={user.username}
          email={user.email}
        />
      )}
    </div>
  );
};
