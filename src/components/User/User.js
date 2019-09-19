import React from 'react';
import './User.css';

const User = ({ data }) => (
  <div>
    <p>
      {data.name}
    </p>
    <p>
      {data.email}
    </p>
  </div>
);

// User.propTypes = UserProps;

export default User;
