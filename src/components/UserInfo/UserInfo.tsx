import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type FunctionName = (event: React.ChangeEvent<HTMLSelectElement>) => void;

const UserInfo: React.FC<{ users: User[]; func: FunctionName }> = ({
  users,
  func,
}) => {
  return (
    <select data-cy="userSelect" onChange={func}>
      <option value="0" disabled selected>
        Choose a user
      </option>

      {users.map(user => (
        <option key={user.id} value={user.name}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default UserInfo;
