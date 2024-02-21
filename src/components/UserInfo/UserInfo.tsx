import React from 'react';

type InfoProps = {
  user: {
    id: number,
    name: string,
    username: string,
    email: string,
  },
};

export const UserInfo: React.FC<InfoProps> = ({ user }) => {
  const { name, email } = user;
  const mailTo = `mailto:${email}`;

  return (
    <a className="UserInfo" href={mailTo}>
      {name}
    </a>
  );
};
