import { User } from '../Types/User';

export type UserInfoProps = {
  user: User
};

export const UserInfo = ({ user } : UserInfoProps) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
