import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ userName }) => (
  <>
    name:
    {' '}
    <span>
      {userName}
    </span>
  </>
);

User.propTypes = {
  userName: PropTypes.string.isRequired,
};
