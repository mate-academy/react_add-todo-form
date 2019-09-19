import React from 'react';
import { UserComponentProps } from '../PropTypes/PropTypes';
import './User.css';

const UserComponent = ({ user }) => {
  const {
    name, phone, email,
  } = user;

  return (
    <div className="user">
      <p className="user__name">
        {name}
      </p>
      <div className="details-wrapper">
        <p className="user__email">
          {email}
        </p>
        <p className="user__phone">
          {phone}
        </p>
      </div>
    </div>
  );
};

UserComponent.propTypes = UserComponentProps;

export default UserComponent;
