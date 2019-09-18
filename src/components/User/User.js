import React from 'react';
import './User.css';
import { UserPropTypes } from '../../constants/proptypes';

function User({ user }) {
  return (
    <>
      <p className="user-name">
        {user.name}
      </p>
      <p className="user-mail">
        {user.email}
      </p>
      <p className="user-website">
        {user.website}
      </p>
    </>
  );
}

User.propTypes = UserPropTypes;

export default User;
