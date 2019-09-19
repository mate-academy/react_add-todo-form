import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

const User = ({ name, id }) => (
  <>
    <span className="li-user">User</span>
    {` : ${name} (id: ${id})`}
  </>
);

export default User;

User.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
