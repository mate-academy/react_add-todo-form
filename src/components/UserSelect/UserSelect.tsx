import React from 'react';
import { User } from '../../types';

type Props = {
  userSelectId: number;
  handleUserSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  usersFromServer: User[];
  hasUserSelectedId: boolean;
};

export const UserSelect: React.FC<Props> = ({
  userSelectId,
  handleUserSelect,
  usersFromServer,
  hasUserSelectedId,
}) => {
  return (
    <div className="field">
      <label htmlFor="userSelect">User: </label>
      <select
        data-cy="userSelect"
        id="userSelect"
        defaultValue={0}
        value={userSelectId}
        onChange={handleUserSelect}
        required
      >
        <option value="0">
          Choose a user
        </option>
        {usersFromServer.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      {hasUserSelectedId && (
        <span className="error">Please choose a user</span>
      )}
    </div>
  );
};
