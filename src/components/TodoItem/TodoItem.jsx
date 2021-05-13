import React from 'react';
import PropTypes from 'prop-types';

import './TodoItem.css';

export const TodoItem = ({
  id, title, user, checked, onChange,
}) => (
  <li className="TodoItem">
    <input
      type="checkbox"
      id={id}
      name={id}
      className="TodoItem__checkbox"
      checked={checked}
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="TodoItem__label"
    >
      {`${user.name || 'User'}:  ${title}`}
    </label>
  </li>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  title: 'Todo item',
  checked: false,
  user: {
    name: '',
  },
};
