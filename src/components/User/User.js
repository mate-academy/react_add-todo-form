import React from 'react';
import PropTypes from 'prop-types';

function User(props) {
  const { user } = props;

  return (
    <div className="user-info">
      <p>{user.name}</p>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
}

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

export default User;
