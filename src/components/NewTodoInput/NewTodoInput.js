import React from 'react';
import PropTypes from 'prop-types';

export const NewTodoInput = ({ title, handleOnChange }) => (
  <>
    <label htmlFor="todoTitle">Title</label>
    <input
      className={`form-control ${!title.isValid && 'is-invalid'}`}
      placeholder="Enter todo"
      type="text"
      id="todoTitle"
      value={title.value}
      onChange={(event) => {
        handleOnChange('title', event.target.value);
      }}
    />
    {!title.isValid && (
      <small className="text-danger">Please enter the title</small>
    )}
  </>
);

NewTodoInput.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  title: PropTypes.objectOf(PropTypes.any).isRequired,
};
