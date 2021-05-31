import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name, completed }) => (
  <>
    <p className="userName">{name}</p>
    {completed ? <p>Completed</p> : <p>Not completed</p>}
  </>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};
