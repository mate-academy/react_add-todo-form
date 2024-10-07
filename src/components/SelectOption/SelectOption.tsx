import React from 'react';
import usersFromServer from '../../api/users';

interface Props {
  name: string;
  value?: string;
  label: string;
  placeholder: string;
  hasError?: boolean;
  onSelectedUser: React.Dispatch<React.SetStateAction<number>>;
}

export const SelectOption: React.FC<Props> = ({
  label,
  placeholder,
  hasError = false,
  onSelectedUser,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor="title">
        {label}
      </label>
      <select
        data-cy="userSelect"
        defaultValue="0"
        onChange={event => onSelectedUser(Number(event.target.value))}
      >
        <option value="0" disabled>
          {placeholder}
        </option>

        {usersFromServer.map((user, index) => {
          return (
            <option key={user.id} value={index + 1}>
              {user.name}
            </option>
          );
        })}
      </select>

      {hasError && <span className="error">Please choose a user</span>}
    </div>
  );
};
