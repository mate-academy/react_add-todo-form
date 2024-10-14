import React from 'react';
import usersFromServer from '../../api/users';

interface Props {
  name: string;
  value?: string;
  label: string;
  placeholder: string;
  hasError?: boolean;
  onSelectedUserId: (currentUserId: number) => void;
}

export const SelectOption: React.FC<Props> = ({
  label,
  placeholder,
  hasError = false,
  onSelectedUserId,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor="title">
        {label}
      </label>
      <select
        data-cy="userSelect"
        defaultValue="0"
        onChange={event => onSelectedUserId(Number(event.target.value))}
      >
        <option value="0" disabled>
          {placeholder}
        </option>

        {usersFromServer.map(user => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>

      {hasError && <span className="error">Please choose a user</span>}
    </div>
  );
};
