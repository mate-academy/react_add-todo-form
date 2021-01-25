import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name }) => (
  <>
    <span className="name">{name}</span>
  </>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
export default User;
