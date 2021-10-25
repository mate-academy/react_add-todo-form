import React from 'react';
import { User } from '../types/UserType';

interface Props {
  user: User | undefined;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="user__info">
    <span className="criterium__field">name:&nbsp;</span>
    <span className="criterium__field criterium__field--name">{user?.name}</span>
    <br />
    <span className="criterium__field">e-mail:&nbsp;</span>
    <span className="criterium__field criterium__field--email">{ user?.email}</span>
  </div>
);
