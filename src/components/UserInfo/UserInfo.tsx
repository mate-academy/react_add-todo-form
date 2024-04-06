import React from 'react';
import { User } from '../../types/User';

export const UserInfo = ({ user }: Props) => (
  <>
    <a className="UserInfo" href={`mailto:${user.email}`} key={user.id}>
      {user.name}
    </a>
  </>
);

type Props = {
  user: User;
};
