import React from 'react';

type Props = {
  errorInput: string;
  value: string;
  handleChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  handleChangeTitle,
  errorInput,
  value,
}) => {
  return (
    <div className="field">
      <input
        type="text"
        value={value}
        data-cy="titleInput"
        placeholder="Enter a title"
        onChange={handleChangeTitle}
      />
      <span className="error">{errorInput}</span>
    </div>
  );
};
