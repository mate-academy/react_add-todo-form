import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = ({ id, name }) => (
  <div className="user user__name" data-user-id={id}>
    {`${name}`}
  </div>
);

User.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default User;
