import React from 'react';

function User({ user }) {
  return (
    <div className="user-info">
      <h3>Name:{user.name}</h3>
      <h3>Email:{user.email}</h3>
      <h3>Phone:{user.phone}</h3>
    </div>
  );
}

export default User;
