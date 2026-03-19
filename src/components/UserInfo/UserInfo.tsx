import React from 'react';
import { User } from '../../api/users'; // Імпортуємо інтерфейс

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
