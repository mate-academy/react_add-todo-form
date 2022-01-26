import React from 'react';

export const UserInfo: React.FC<User> = ({
  name,
  email,
}) => (
  <div className="content">
    <div className="description">
      <p>{`Name: ${name}`}</p>
      <p>{`E-mail: ${email}`}</p>
    </div>
  </div>
);
