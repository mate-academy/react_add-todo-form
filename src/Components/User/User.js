import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

const User = ({ userInfo }) => (
  <h5 className="todo-card__user">{userInfo.name}</h5>
);

User.propTypes = {
  userInfo: PropTypes.string.isRequired,
};

export default User;
