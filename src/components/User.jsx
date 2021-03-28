import React from 'react';
import PropTypes from 'prop-types';

function User({ name }) {
  return (
    <>
      <p className="todos__name">{name}</p>
    </>
  );
}

export default User;

User.propTypes = {
  name: PropTypes.string.isRequired,
};
