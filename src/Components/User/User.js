/* eslint-disable react/prop-types */
import React from 'react';
import './User.scss';

const User = ({ userInfo }) => (
  <h4 className="todo-card__user">{userInfo.user.name}</h4>
);

export default User;
