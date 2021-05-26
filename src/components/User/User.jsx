import React from 'react';
import './User.scss';
import { UserType } from '../../types';

export function User({ user }) {
  return (
    <div className="user">
      <ul className="user__list">
        <li className="user__item">
          <span>Name:</span>
          {user.name}
        </li>
        <li className="user__item">
          <span>Email:</span>
          {user.email}
        </li>
        <li className="user__item">
          <span>Phone:</span>
          {user.phone}
        </li>
        <li className="user__item">
          <span>Website:</span>
          {user.website}
        </li>
        <li className="user__item">
          <span>Company:</span>
          {user.company.name}
        </li>
      </ul>
    </div>
  );
}

User.propTypes = {
  user: UserType.isRequired,
};
