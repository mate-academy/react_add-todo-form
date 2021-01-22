import React from 'react';
import { TypeUser } from '../types';
import './todo.scss';

const User = ({ user }) => (
  <span className="todo__user-name">{user}</span>
);

User.propTypes = TypeUser;

export default User;
