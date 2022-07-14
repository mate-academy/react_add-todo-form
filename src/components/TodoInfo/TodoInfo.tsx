import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

export const TodoInfo: React.FC<Todo> = ({
  title, completed, user,
}) => (
  <p>
    <div data-cy="title">
      {`Title: ${title}`}
    </div>
    <div data-cy="status">
      {`Completed: ${completed ? 'yes' : 'no'}`}
    </div>
    <div>
      {user && (
        <UserInfo
          name={user.name}
          username={user.username}
          email={user.email}
        />
      )}
    </div>
  </p>
);
