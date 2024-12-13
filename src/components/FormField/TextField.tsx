import React, { useState } from 'react';
import { User } from '../../Types/User';

interface Props {
  users: User[];
  name: string;
  value: string;
  placeholder?: string;
  choose?: (variant: number) => void;
  onChange?: (newValue: string) => void;
}

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  users,
  choose,
  placeholder = `Enter ${name}`,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError = touched && !value;

  return (
    <div className="field">
      <label htmlFor={id}>
        Title:
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
          data-cy="titleInput"
        />
        {hasError && <span className="error">Please enter a title</span>}
      </label>

      <br />

      <div className="field">
        <select
          data-cy="userSelect"
          onChange={event => choose(event.target.value)}
        >
          User:
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(person => (
            <option value={person.id} key={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        {hasError && <span className="error">Please choose a user</span>}
      </div>
    </div>
  );
};
