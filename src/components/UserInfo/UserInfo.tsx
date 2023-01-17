import React, { memo } from 'react';
import { User } from '../Types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = memo(({ user }) => {
  const { name, email } = user;

  return (
    <a
      className="UserInfo card-link text-white fst-italic text-decoration-none"
      href={`mailto:${email}`}
    >
      {name}
    </a>
  );
});
