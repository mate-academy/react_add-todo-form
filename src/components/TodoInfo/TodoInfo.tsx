import React from 'react';
import users from '../../api/users';

import { Todo, User } from '../../types/types';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = users.find((us: User) => us.id === todo.userId);

  return (
    <>
      <h2>{todo.title}</h2>
      <div>
        <p>
          {todo.completed ? 'Completed' : 'Not completed'}
        </p>
        <p>
          {user && user.name}
        </p>
        <p>
          {user && user.email}
        </p>
      </div>
    </>
  );
};
