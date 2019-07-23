import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userData }) => (
  <span className="User">
    {userData.name}
  </span>
);

User.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
