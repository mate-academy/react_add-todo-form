/* eslint-disable import/no-cycle */
import { User } from '../../App';

export interface UserProps {
  user: User;
}

export const UserInfo = ({ user }: UserProps) => (
  <a
    className="UserInfo"
    href={`mailto:${user.email}`}
  >
    {user.name}
  </a>
);
