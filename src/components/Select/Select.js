import React from 'react';
import { NewTodoShape } from '../Shapes/NewTodoShape';

export const Select = (props) => {
  const {
    value,
    onChange,
    name,
    options,
    className,
  } = props;

  const handleChange = (event) => {
    const option = options
      .find(currentOption => currentOption.value === +event.target.value);

    onChange(option.value, name);
  };

  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className={className}
    >
      {options.map(option => (
        <option
          key={option.value}
          value={option.value}
          disabled={!!option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = NewTodoShape.isRequired;

Select.defaultProps = {
  className: '',
};
