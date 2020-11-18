import React from 'react';
import PropTypes from 'prop-types';

import './StylesFromUser.scss';

export const User = ({ username }) => (
  <>
    User name:
    <span className="user">{username}</span>
  </>

);

User.propTypes = {
  username: PropTypes.string.isRequired,
};
