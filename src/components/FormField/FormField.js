import React from 'react';

import cx from 'classnames';
import propTypes from 'prop-types';

const FormField = (props) => {
  const {
    error,
    label,
    value,
    name,
    type,
    placeholder,
    onChange,
  } = props;

  const inputClass = cx('input', { 'error-message': !!error });

/* eslint-disable */
  return (
    <>
      <label htmlFor={name} className="label">Enter todo title:</label>
      <input
        label={label}
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        className={inputClass}
        onChange={onChange}
      />
      {error && (<p className="error-message">{error}</p>)}
    </>
  );
/* eslint-enable */
};

FormField.propTypes = {
  label: propTypes.string,
  value: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string,
  type: propTypes.string,
  error: propTypes.string,
};

FormField.defaultProps = {
  label: '',
  error: '',
  type: 'text',
  placeholder: 'Type text here',
};

export default FormField;
