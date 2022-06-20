import React from 'react';
import { UserInfo } from '../UserInfo';

interface Props {
  title: string;
  completed: boolean;
  user: User | null | undefined;
}

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  user,
}) => (
  <div className="todoinfo">
    <h2 data-cy="title">{`Task Name: ${title}`}</h2>
    <h2 data-cy="status">
      {completed
        ? ('Completed')
        : ('Not Completed')}
    </h2>
    {user && (
      <UserInfo
        name={user.name}
        username={user.username}
        email={user.email}
      />
    )}
  </div>
);
