import React from 'react';
import PropTypes from 'prop-types';

export const InputForTitle = ({ onChange, value, inputValidation }) => (
  <label>
    <strong>
      Title:
    </strong>
    <input
      type="text"
      maxLength="40"
      name="todoTitle"
      placeholder="only English"
      onChange={onChange}
      value={value}
    />
    { inputValidation
    && <strong>
      Please enter the title
    </strong>
    }
  </label>
);

InputForTitle.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}
