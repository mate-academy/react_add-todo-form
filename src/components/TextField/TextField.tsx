import React from 'react';
import { DefaultErrorsState } from '../../types';

type Props = {
  inputId: string;
  name: string;
  value: string;
  placeholder: string;
  label?: string;
  onChange: (newValue: string) => void;
  errors: DefaultErrorsState;
};

export const TextField: React.FC<Props> = ({
  inputId,
  name,
  value,
  placeholder,
  label,
  onChange,
  errors,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={`${name}-${inputId}`}>
        {label}
      </label>
      <input
        id={`${name}-${inputId}`}
        type="text"
        value={value}
        data-cy={name}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      {errors.titleInput && <span className="error">{errors.titleInput}</span>}
    </div>
  );
};
