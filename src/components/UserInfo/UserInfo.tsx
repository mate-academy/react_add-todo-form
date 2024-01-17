import { UserProps } from '../types';

export const UserInfo: React.FC<UserProps> = ({ userInfo }) => {
  return (
    <a className="UserInfo" href={`mailto:${userInfo.email}`}>
      {userInfo.name}
    </a>
  );
};
