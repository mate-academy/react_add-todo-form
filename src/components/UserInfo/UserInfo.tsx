import React from 'react';
import { User } from '../../types/User';

interface Props {
  userId: number;
  onChange: (userId: number) => void;
  users: User[];
  hasError: boolean;
  setHasError: (value: boolean) => void;
}

export const UserInfo: React.FC<Props> = ({
  userId,
  onChange,
  users,
  hasError,
  setHasError,
}) => {
  return (
    <div className="field">
      <select
        value={userId}
        data-cy="userSelect"
        onChange={event => {
          onChange(+event.target.value);
          setHasError(false);
        }}
      >
        <option value="0" disabled>
          Choose a user
        </option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {hasError && <span className="error">Please choose a user</span>}
    </div>
  );
};
