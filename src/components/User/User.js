import React from 'react';
import { UserProps } from '../../constants/proptypes';
import './User.css';

const User = ({ user }) => (
  <span className="todo-list-item__user">{user.name}</span>
);

User.propTypes = UserProps;

export default User;
