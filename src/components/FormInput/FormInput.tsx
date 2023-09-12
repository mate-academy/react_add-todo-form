import React from 'react';

type Props = {
  todoTitle: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasTitleError: boolean;
};

export const TitleInput: React.FC<Props> = ({
  todoTitle,
  handleInputChange,
  hasTitleError,
}) => {
  return (
    <div className="field">
      <label htmlFor="titleInput">Title: </label>
      <input
        id="titleInput"
        type="text"
        data-cy="titleInput"
        placeholder="Enter a title"
        value={todoTitle}
        onChange={handleInputChange}
      />
      {hasTitleError && (
        <span className="error">Please enter a title</span>
      )}
    </div>
  );
};
