import React from 'react';
import { UserComponentProps } from '../PropTypes/PropTypes';
import './User.css';

const UserComponent = ({ user }) => {
  const {
    username, name, phone, website, email,
  } = user;

  return (
    <div className="user">
      <p className="user__username">
        {username}
      </p>
      <p className="user__name">
        {name}
      </p>
      <p className="user__email">
        {email}
      </p>
      <p className="user__phone">
        {phone}
      </p>
      <p className="user__website">
        {website}
      </p>
    </div>
  );
};

UserComponent.propTypes = UserComponentProps;

export default UserComponent;
