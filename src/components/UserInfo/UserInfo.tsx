import { UserInfoProps } from '../../types/UserInfo';

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
