import React from 'react';

// interface Todo {
//   id: number;
//   title: string;
//   userId: number;
//   completed: boolean;
//   user: {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//   };
// }

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
