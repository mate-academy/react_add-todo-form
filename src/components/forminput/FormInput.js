import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ title, handleChange, titleError }) => (
  <>
    <input
      name="title"
      id="title"
      placeholder="Task"
      type="text"
      value={title}
      onChange={handleChange}
      className="ui input"
    />

    {
      titleError
        ? (
          <span className="ui red pointing basic label">
            Please enter the title
          </span>
        )
        : (
          <label
            className="ui pointing label"
            htmlFor="title"
          >
            Enter the title
          </label>
        )
    }
  </>
);

FormInput.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  titleError: PropTypes.bool.isRequired,
};

export default FormInput;
