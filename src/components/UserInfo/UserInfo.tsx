import React from 'react';

type Props = {
  name: string;
  username: string;
  email: string;
};

export const UserInfo: React.FC<Props> = ({ name, username, email }) => (
  <>
    {`@${username} | ${name} | `}
    <a href={`mailto: ${email}`}>{email}</a>
  </>
);
