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
  const [touched, setTouched] = useState(false);

  const id = `${name}-${getRandomDigits()}`;
  let hasError = false;
  let errorMessage = '';

  // eslint-disable-next-line max-len
  const pattern = /^(?=.*[a-zA-Z0-9А-ЩЬЮЯҐЄІЇа-щьюяґєії])[a-zA-Z0-9А-ЩЬЮЯҐЄІЇа-щьюяґєії\s]*$/u;

  if (name === 'title') {
    hasError = (touched || formTouched) && required && !pattern.test(value);
    errorMessage = 'Only UA or EN letters, digits, and spaces are allowed';
  }

  if (!value.trim()) {
    hasError = (touched || formTouched) && required && !value.trim();
    errorMessage = `Please enter a ${name}`;
  }

  const handleChange = (newValue: string) => {
    onChange(newValue);
    setTouched(true);
  };

  return (
    <div className="field">
      <label htmlFor={id}>Title: </label>
      <input
        id={id}
        value={value}
        onChange={event => handleChange(event.target.value)}
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
