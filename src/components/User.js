import React from 'react';
import { TypeUser } from '../types';
import './todo.scss';

const User = ({ name }) => (
  <span className="todo__user-name">{name}</span>
);

User.propTypes = TypeUser;

export default User;
