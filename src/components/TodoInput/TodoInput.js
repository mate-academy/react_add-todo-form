import React from 'react';
import PropTypes from 'prop-types';

export const TodoInput = ({ title, handleOnChange }) => (
  <>
    <label htmlFor>Title</label>
    <input
      className={`form-control ${!title.isValid && 'is-invalid'}`}
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

TodoInput.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  title: PropTypes.objectOf(PropTypes.any).isRequired,
};
