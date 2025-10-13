import React from 'react';

type Option = { value: string | number; label: string };

type Props = {
  id: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  dataCy?: string;
  hasError?: boolean;
  errorText?: string;
};

export const FormSelect: React.FC<Props> = ({
  id,
  label,
  value,
  options,
  onChange,
  dataCy,
  hasError,
  errorText,
}) => (
  <div className="field">
    <label className="label" htmlFor={id}>
      {label}
    </label>
    <div className="control">
      <div className={`select is-fullwidth${hasError ? ' is-danger' : ''}`}>
        <select
          id={id}
          data-cy={dataCy}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
    {hasError && <p className="error help is-danger">{errorText}</p>}
  </div>
);
