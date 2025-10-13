import React from 'react';

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dataCy?: string;
  hasError?: boolean;
  errorText?: string;
};

export const FormInput: React.FC<Props> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  dataCy,
  hasError,
  errorText,
}) => (
  <div className="field">
    <label className="label" htmlFor={id}>
      {label}
    </label>
    <div className="control">
      <input
        id={id}
        data-cy={dataCy}
        type="text"
        className={`input${hasError ? ' is-danger' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
    {hasError && <p className="error help is-danger">{errorText}</p>}
  </div>
);
