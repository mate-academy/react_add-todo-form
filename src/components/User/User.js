import React from 'react';

import { UserProps } from '../PropTypes/PropTypes';

import './User.css';

const User = ({ user }) => {
  const {
    username, email, name, phone, website,
  } = user;

  return (
    <div className="user">
      <p className="user__name">{name}</p>
      <p className="user__username">{username}</p>
      <div className="user__details">
        <span className="user__phone">{phone}</span>
        <a href=":mail" className="user__email">{email}</a>
        <a href="#1" className="user__website">{website}</a>
      </div>
    </div>
  );
};

User.propTypes = UserProps;

export default User;
