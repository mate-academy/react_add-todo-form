import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Errors/Errors';

const Select = ({
  header,
  id,
  value,
  options,
  isValid,
  errorTexts,
  handler,
}) => (
  <label htmlFor={id} className="todo__label">
    {header && `${header}: `}
    <select
      id={id}
      className="todo__field"
      value={value}
      onChange={e => handler(e.target.id, e.target.value)}
    >
      <option value={0} />
      {options.map(option => (
        <option value={option.id} key={option.id}>
          {option.name}
        </option>
      ))}
    </select>
    <Error display={isValid.display} isValid={isValid[id]} text={errorTexts} />
  </label>
);

Select.propTypes = {
  header: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  options: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isValid: PropTypes.shape({
    display: PropTypes.bool.isRequired,
    title: PropTypes.bool.isRequired,
    userId: PropTypes.bool.isRequired,
  }).isRequired,
  errorTexts: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Select;
