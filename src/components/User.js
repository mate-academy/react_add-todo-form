import React from 'react';
import PropTypes from 'prop-types';

function User({ name, i }) {
  return (
    <p className="username">{`${name} user id is ${i}`}</p>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
};

export default User;
