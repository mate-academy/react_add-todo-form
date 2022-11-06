import { FC } from 'react';
import { User } from '../../types/Type';

interface Prop {
  user: User;
}

export const UserInfo: FC<Prop> = ({ user }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
