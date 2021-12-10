import React from 'react';

type Props = {
  name: string;
  email: string;
};

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <>
    <h3 className="name">{`Name: ${name}`}</h3>
    <span className="email">{`e-mail: ${email}`}</span>
  </>
);
