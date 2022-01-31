import React from 'react';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <div className="user-info">
    <p>{`User: ${name} | email:${email}`}</p>
  </div>
);
