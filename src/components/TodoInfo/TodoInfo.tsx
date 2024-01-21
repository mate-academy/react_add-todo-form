import React from 'react';

type Props = {
  value: string,
  label: string,
  placeholder?: string,
  onChange?: (newValue: string) => void,
  hasError?: boolean;
};

export const TodoInfo: React.FC<Props> = ({
  value,
  label,
  placeholder = 'Enter a title',
  onChange = () => { },
  hasError = false,
}) => {
  const handleTouchedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className=""
    >
      <label
        className="label"
        htmlFor="title-id"
      >
        {label}
      </label>

      <input
        id="title-id"
        type="text"
        data-cy="titleInput"
        value={value}
        placeholder={placeholder}
        onChange={handleTouchedChange}
      />

      {hasError && (
        <span className="error">
          Please enter a title
        </span>
      )}
    </div>
  );
};
