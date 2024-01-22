import { UserProps } from '../types';

export const UserInfo: React.FC<UserProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
