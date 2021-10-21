import React from 'react';

type Props = {
  name: string;
  email: string;
};

export const UserInfo: React.FC<Props> = (({ name, email }) => (
  <>
    <div className="item__content">{name}</div>
    <div className="item__content">{email}</div>
  </>
));
