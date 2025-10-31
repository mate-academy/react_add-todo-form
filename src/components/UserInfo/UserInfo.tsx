import React from 'react';

interface Props {
  user: {
    name: string;
    email: string;
  } | null;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (user === null) {
    return;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
