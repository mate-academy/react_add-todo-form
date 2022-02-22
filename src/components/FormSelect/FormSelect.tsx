import React from 'react';
import { User } from '../../types';

type Props = {
  users: User[],
  addTodoUserId: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  todoUserId: number,
};

export const FormSelect: React.FC<Props> = ({ users, addTodoUserId, todoUserId }) => {
  return (
    <select
      name="users"
      value={todoUserId}
      onChange={addTodoUserId}
    >
      <option
        value={0}
      >
        Chose a user
      </option>

      {users.map((user: User) => (
        <option
          value={user.id}
          key={user.id}
        >
          {user.name}
        </option>
      ))}
    </select>
  );
};
