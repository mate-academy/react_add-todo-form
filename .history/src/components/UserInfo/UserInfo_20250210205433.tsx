import React from 'react';

type Prop = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};
export const UserInfo: React.FC<Prop> = ({ user }) => {
  return (
    <a className="UserInfo" href="mailto:Sincere@april.biz">
      Leanne Graham
    </a>
  );
};
