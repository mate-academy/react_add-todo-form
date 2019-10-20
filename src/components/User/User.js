import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => {
  const {
    name,
    phone,
    website,
    email,
  } = user;

  return (
    <div className="user">
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

export default User;

User.propTypes = {
  user: PropTypes.shape().isRequired,
};
