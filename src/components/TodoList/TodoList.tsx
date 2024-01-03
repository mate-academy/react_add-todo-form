import React from 'react';
import { User } from '../../types/Users';

type Users = {
  users: User[];
};

export const TodoList: React.FC<Users> = ({ users }) => {
  return (
    <div className="field">
      <label htmlFor="user">User: &nbsp;</label>
      <select id="user" data-cy="userSelect">
      {users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
    ))}
      </select>
      <span className="error">Please choose a user</span>
    </div>
  );
};
