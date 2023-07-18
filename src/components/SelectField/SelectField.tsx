import React, { useState } from 'react';
import { User } from '../../types';

type Props<T> = {
  name: string,
  value: string,
  options: T[]
  formTouched: boolean,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const SelectField: React.FC<Props<User>> = ({
  name,
  value,
  options,
  formTouched,
  label = name,
  placeholder = `Enter a ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const hasError = required && formTouched && value === '0';
  const errorMessage = `Please choose a ${name}`;

  return (
    <div className="field">
      <label htmlFor={id}>User: </label>

      <select
        id={id}
        value={value}
        onChange={event => onChange(event.target.value)}
        data-cy="userSelect"
        placeholder={placeholder}
      >

        <option value="0" disabled>Choose a user</option>

        {options.map(option => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      {hasError && (
        <span className="error">{errorMessage}</span>
      )}
    </div>
  );
};
