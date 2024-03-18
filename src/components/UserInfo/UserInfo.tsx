import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user: { name, email } }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
