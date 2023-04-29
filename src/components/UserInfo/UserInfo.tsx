import React from 'react';

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

type Props = {
  // eslint-disable-next-line react/require-default-props
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${user?.email}`}
    >
      {user?.name}
    </a>
  );
};
