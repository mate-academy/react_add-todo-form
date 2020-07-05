import React from 'react';
import PropTypes from 'prop-types';
import { SelectUser } from './SelectUser';

export const NewTodo
= (
  { onSubmit, onTitleChange, onUserChange, user,
    title, userError, titleError },
) => (
  <form onSubmit={onSubmit}>
    <label htmlFor="title">
      {`Title: `}
    </label>
    {
      titleError
        ? (
          <span className="error">
            Please enter a title
          </span>
        )
        : (
          <span>
            {` `}
          </span>
        )
    }
    <input
      type="text"
      id="title"
      name="title"
      maxLength={100}
      value={title}
      onChange={onTitleChange}
    />
    {
      userError
        ? (
          <span className="error">
            Please select a user
          </span>
        )
        : (
          <span>
            {` `}
          </span>
        )
    }
    <SelectUser onChange={onUserChange} selectedUser={user} />
    <button type="submit">
      Add
    </button>
  </form>
);

NewTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onUserChange: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userError: PropTypes.bool.isRequired,
  titleError: PropTypes.bool.isRequired,
};
