import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user: { name, phone, email } }) => (
  <>
    <p className="todo-list__item-name">{name}</p>
    <p>{phone}</p>
    <p>{email}</p>
  </>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
