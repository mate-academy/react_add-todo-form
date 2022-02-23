import React from 'react';
import { Todos } from '../../Types/Todos';
import { UserInfo } from '../UserInfo/UserInfo';

export const MakeTodosCard: React.FC<Todos> = ({
  title,
  completed,
  user,
  id,
}) => {
  const status = completed ? 'completed' : 'not completed';

  return (
    <div>
      <h3>{title}</h3>
      <p>
        {`Status: ${status}`}
      </p>
      <p>
        {`id ${id}`}
      </p>
      <div>
        {user && (
          <div>
            <UserInfo
              name={user.name}
              email={user.email}
            />
          </div>
        )}
      </div>
    </div>
  );
};
