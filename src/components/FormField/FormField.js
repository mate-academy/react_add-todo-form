import React from 'react';
import cx from 'classnames';

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
      {error && (<p className='error-message'>{error}</p>)}
    </>
  )
}

// FormField.propTypes = {
//   label: propTypes.string.isRequired,
//   value: propTypes.string.isRequired,
//   name: propTypes.string.isRequired,
//   onChange: propTypes.func.isRequired,
//   placeholder: propTypes.stringisRequired,
//   type: propTypes.string,
//   email: propTypes.string,
// };

FormField.defaultProps = {
  error: '',
  type: 'text',
  placeholder: 'Type text here'
}

export default FormField;
