import { UserType } from '../../types/UserType';

type UserInfoProps  = {
  user?: UserType | null;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
