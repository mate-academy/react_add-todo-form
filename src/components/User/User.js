import React from 'react';

const User = ({ user: { name } }) => (
  <>
    <p>User: {name}</p>
  </>
);

export default User;
