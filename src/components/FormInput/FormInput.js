import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../../shapes/UserShape';

export const FormInput = (
  { handleChange, title, titleError },
) => (
  <>
    <label className="TodoForm__label" htmlFor="title">
      Enter the title
    </label>
    <input
      name="title"
      id="title"
      placeholder="Task"
      type="text"
      value={title}
      onChange={handleChange}
      className="TodoForm__field"
    />

    {
      titleError
        ? <span className="TodoForm__error">Please enter the title</span>
        : ''
    }
  </>
);

FormInput.propTypes = PropTypes.shape({
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  titleError: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(UserShape).isRequired,
}).isRequired;
