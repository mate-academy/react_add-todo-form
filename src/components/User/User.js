import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ user }) => (
  <div className="user-info">
    <p>{user.name}</p>
    <a href={`mailto:${user.email}`}>{user.email}</a>
  </div>
);

User.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};
