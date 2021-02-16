import React from 'react';
import './User.css';
import { UserType } from '../../types';

export const User = ({ name }) => (
  <td className="user_name">{name}</td>
);

User.propTypes = UserType;
