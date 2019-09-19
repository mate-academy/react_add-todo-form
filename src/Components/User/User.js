import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

const User = ({
  name,
  phone,
  website,
  email,
}) => (
  <div className="user">
    <p className="user__title">{name}</p>
    <span>Info:</span>
    <p className="user__title user--nik">{email}</p>
    <p className="user__title">{phone}</p>
    <p className="user__title user--email">{website}</p>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};

export default User;
