import { FC } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserInfoProps {
  user: User;
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
