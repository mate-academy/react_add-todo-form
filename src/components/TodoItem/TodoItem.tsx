import React, { useState } from 'react';

import { PrepTodo } from '../../react-app-env';

export interface Props {
  todo: PrepTodo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    name,
    userId,
    completed,
    user,
  } = todo;

  const [done, setDone] = useState(completed);

  return (
    <>
      {user && (
        <p>{`UserName - ${user.name}`}</p>
      )}

      <p>{`Title - ${name}`}</p>
      <p>
        <label>
          Done
          <input
            type="checkbox"
            checked={done}
            onChange={() => setDone(!done)}
          />
        </label>
      </p>

      <p>{`id - ${id}`}</p>
      <p>{`userId - ${userId}`}</p>
    </>
  );
};
