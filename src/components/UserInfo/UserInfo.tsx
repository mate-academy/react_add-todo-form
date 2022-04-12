import { FC } from 'react';
import { User } from '../types/User';

interface Props {
  user: User;
}

export const UserInfo: FC<Props> = ({ user }) => (
  <>
    <h3 className="user">
      {user.name}
    </h3>
    <a href={`mailto:${user.email}`} className="user_mail">{user.email}</a>
  </>
);
