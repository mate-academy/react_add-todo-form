import React from 'react';

interface Props {
  id: number;
  name: string;
  email: string;
}

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <a href={`mailto:${email}`} className="UserInfo">
    {name}
  </a>
);
