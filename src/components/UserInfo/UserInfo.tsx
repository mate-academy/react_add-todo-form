import { FC } from 'react';

type Props = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  }
};

export const UserInfo: FC<Props> = ({ user }) => {
  const {
    name,
    email,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
