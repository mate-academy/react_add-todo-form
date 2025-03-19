import React from 'react';
import { TodosUser } from '../../types/todo';

interface Props {
  user: TodosUser;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
