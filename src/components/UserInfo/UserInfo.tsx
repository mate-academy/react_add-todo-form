import React from 'react';

export interface User {
  id: number
  name: string
  username: string
  email: string
}

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({
  user: {
    email,
    name,
  },
}) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
