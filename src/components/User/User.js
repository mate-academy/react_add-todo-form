import React from 'react';

const User = ({ user: { name, phone, email } }) => (
  <>
    <p className="todo-list__item-name">{name}</p>
    <p>{phone}</p>
    <p>{email}</p>
  </>
);

export default User;
