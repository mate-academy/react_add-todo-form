import { UserInfoProps } from '../../types';

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <a className="UserInfo" href="mailto:Sincere@april.biz">
      {user?.name}
    </a>
  );
};
