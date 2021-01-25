import React from 'react';
import propTypes from 'prop-types';

export const User = ({ id, user, title }) => (
  <li key={id}>
    <span>
      {user.name}
      {` `}
    </span>
    <span>{title}</span>
    <input
      type="checkbox"
    />
  </li>
);

User.propTypes = {
  user: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
};
