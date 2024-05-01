import { FC } from 'react';
import { User } from '../../App';

interface Props {
  user: User;
}
export const UserInfo: FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
