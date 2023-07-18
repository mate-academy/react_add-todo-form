import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
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

export const TextField: React.FC<Props> = ({
  name,
  value,
  formTouched,
  label = name,
  placeholder = `Enter a ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  let hasError = false;
  let errorMessage = '';

  // eslint-disable-next-line max-len
  const pattern = /^(?=.*[a-zA-Z0-9А-ЩЬЮЯҐЄІЇа-щьюяґєії])[a-zA-Z0-9А-ЩЬЮЯҐЄІЇа-щьюяґєії\s]*$/u;

  if (name === 'title') {
    hasError = touched && required && !pattern.test(value);
    errorMessage = 'Only UA or EN letters, digits, and spaces are allowed';
  }

  if (!value.trim()) {
    hasError = touched && required && !value.trim();
    errorMessage = `Please enter a ${name}`;
  }

  if (formTouched) {
    hasError = required && !value.trim();
    errorMessage = `Please enter a ${name}`;
  }

  return (
    <div className="field">
      <label htmlFor={id}>Title: </label>
      <input
        id={id}
        value={value}
        onChange={event => onChange(event.target.value)}
        onBlur={() => setTouched(true)}
        type="text"
        data-cy="titleInput"
        placeholder={placeholder}
      />
      {hasError && (
        <span className="error">{errorMessage}</span>
      )}
    </div>
  );
};
