import React from 'react';
import { Users } from '../../types/Users';

type Props = {
  users: Users;
  errorMessage: string;
  value: string;
  handleChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: React.FC<Props> = ({
  users,
  errorMessage,
  handleChangeSelect,
  value,
}) => {
  return (
    <div className="field">
      <select data-cy="userSelect" onChange={handleChangeSelect} value={value}>
        <option value="0" disabled>
          Choose a user
        </option>
        {users.map(({ id, name }) => (
          <option value={name} key={id}>
            {name}
          </option>
        ))}
      </select>

      <span className="error">{errorMessage}</span>
    </div>
  );
};
