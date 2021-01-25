import React from 'react';
import { UserType } from '../../types';
import './User.css';

export const User = ({ name }) => (
  <div className="user__name">
    <b>Name</b>
    {': '}
    {`${name}`}
  </div>
);

User.propTypes = UserType.isRequired;
