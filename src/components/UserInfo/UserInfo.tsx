import { User } from '../Types/User';

export type UserInfoPropsType = {
  user: User
};

export const UserInfo = ({ user }: UserInfoPropsType) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
