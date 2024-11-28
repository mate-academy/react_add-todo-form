import React from 'react';
import { User } from '../../types/Users';
import { DefaultErrorsState } from '../../types';

type Props = {
  name: string;
  label: string;
  value: string;
  users: User[];
  onChange: (newValue: string) => void;
  selectId: string;
  errors: DefaultErrorsState;
};
export const SelectUser: React.FC<Props> = ({
  label,
  selectId,
  name,
  value,
  users,
  onChange,
  errors,
}) => {
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="field">
      <label htmlFor={`${name}-${selectId}`}>{label}</label>
      <select
        id={`${name}-${selectId}`}
        data-cy={name}
        value={value}
        onChange={handleChangeSelect}
      >
        <option value={value} disabled>
          choose a user
        </option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {errors.userSelect && <span className="error">{errors.userSelect}</span>}
    </div>
  );
};
