import { FC } from 'react';
import { User } from '../../Types/Types';

export const UserInfo: FC<Pick<User, 'name' | 'email'>> = ({ name, email }) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
