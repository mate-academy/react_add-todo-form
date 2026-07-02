import React from 'react';
import { User } from '../../types/todos';

interface Props {
  user: User;
}
// Add the required props
export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
