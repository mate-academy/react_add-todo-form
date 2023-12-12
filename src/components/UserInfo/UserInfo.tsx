import { UserProps } from './UserInfo.types';

export const UserInfo: React.FC<UserProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
