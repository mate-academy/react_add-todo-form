import { UserInfoType } from '../../types/UserInfoType';

export const UserInfo: React.FC<UserInfoType> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
