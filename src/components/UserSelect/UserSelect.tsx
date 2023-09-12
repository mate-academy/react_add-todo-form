import React from 'react';
import { User } from '../../types';

type Props = {
  selectedUserId: number;
  handleUserSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  usersFromServer: User[];
  hasSelectedUserError: boolean;
};

export const UserSelect: React.FC<Props> = ({
  selectedUserId,
  handleUserSelect,
  usersFromServer,
  hasSelectedUserError,
}) => {
  return (
    <div className="field">
      <label htmlFor="userSelect">User: </label>
      <select
        data-cy="userSelect"
        id="userSelect"
        defaultValue={0}
        value={selectedUserId}
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
      {hasSelectedUserError && (
        <span className="error">Please choose a user</span>
      )}
    </div>
  );
};
