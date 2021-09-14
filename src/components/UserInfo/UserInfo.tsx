import React from 'react';

type Props = {
  users: User;
};

export const UserInfo: React.FC<Props> = (props) => (

  <div>
    <p>{props.users.name}</p>
    <p>{props.users.username}</p>
    <p>{props.users.email}</p>
  </div>
);
