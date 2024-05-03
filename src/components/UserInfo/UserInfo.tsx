import { UserInfosProps } from '../../types';

export const UserInfo: React.FC<UserInfosProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
