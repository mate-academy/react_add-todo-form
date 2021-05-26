import React from 'react';
import './User.css';
import propTypes from 'prop-types';

const User = ({ name }) => (
  <h2 className="user-name">
    {name}
  </h2>
);

User.propTypes = {
  name: propTypes.string.isRequired,
};

export default User;
