import { UserInfoType } from '../../types/UserInfoType';

export const UserInfo = ({ user }: { user: UserInfoType }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
