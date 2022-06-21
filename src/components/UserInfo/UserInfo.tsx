import React from 'react';
import 'bulma/css/bulma.min.css';

interface Props {
  name: string,
  email: string,
}

export const UserInfo: React.FC<Props> = ({ name, email }) => {
  return (
    <ul className="box has-background-dark has-text-white my-3">
      <li data-cy="username">{name}</li>
      <li data-cy="email">{email}</li>
    </ul>
  );
};
