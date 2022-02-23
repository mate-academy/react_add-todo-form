import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => {
  const status = completed ? 'completed' : 'uncompleted';

  return (
    <div>
      <h2>{title}</h2>
      <p>{`Status user: ${status}`}</p>
      {user && (
        <div className="todos__user">
          <UserInfo
            name={user.name}
            email={user.email}
          />
        </div>
      )}
    </div>
  );
};
