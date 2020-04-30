import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ header, id, checked, handler }) => (
  <label htmlFor={id} className="todo__label">
    {header && `${header}: `}
    <input
      id={id}
      className="todo__checkbox"
      type="checkbox"
      checked={checked}
      onChange={e => handler(e.target.id, !checked)}
    />
  </label>
);

Checkbox.defaultProps = {
  header: '',
};

Checkbox.propTypes = {
  header: PropTypes.string,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Checkbox;
