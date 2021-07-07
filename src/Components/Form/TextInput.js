import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Errors/Errors';

const TextInput = ({ header, id, value, isValid, errorTexts, handler }) => (
  <label htmlFor={id} className="todo__label">
    {header && `${header}: `}
    <input
      id={id}
      className="todo__field"
      type="text"
      value={value}
      onChange={e => handler(e.target.id, e.target.value)}
    />
    <Error display={isValid.display} isValid={isValid[id]} text={errorTexts} />
  </label>
);

TextInput.propTypes = {
  header: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isValid: PropTypes.shape({
    display: PropTypes.bool.isRequired,
    title: PropTypes.bool.isRequired,
    userId: PropTypes.bool.isRequired,
  }).isRequired,
  errorTexts: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default TextInput;
