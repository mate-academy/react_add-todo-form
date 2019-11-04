import React from 'react';

function User(props) {
  // eslint-disable-next-line react/prop-types
  const { user } = props;

  return (
    <a className="user-info" href={`mailto:${user.email}`}>{user.name}</a>
  );
}

export default User;
