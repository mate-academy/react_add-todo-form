import React from 'react';
import PropTypes from 'prop-types';

import './StylesFromUser.scss';

export const User = ({ username }) => (
  <span className="user">
    User name:
    {' '}
    {username}
  </span>
);

User.propTypes = {
  username: PropTypes.string.isRequired,
};
