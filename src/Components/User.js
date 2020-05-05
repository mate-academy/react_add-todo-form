import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name }) => (
  <div className="user__username">
    <strong>Name: </strong>
    {name}
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default User;
