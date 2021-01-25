import React from 'react';
import PropTypes from 'prop-types';

export const Input = (props) => {
  const { value, error, handleChange } = props;

  return (
    <>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        name="enteredTitle"
        value={value}
        onChange={handleChange}
      />

      {
        error
        && <div className="form__error">Please enter the title</div>
      }

    </>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
