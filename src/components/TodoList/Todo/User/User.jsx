import React from 'react';
import PropTypes from 'prop-types';

import './User.scss';

export function User({ name }) {
  return (
    <p className="todo-list__user-name">{name}</p>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
};
