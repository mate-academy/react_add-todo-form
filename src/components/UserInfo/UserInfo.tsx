import React from 'react';

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
}

// interface Todos {
//   id?: number;
//   title: string;
//   completed?: boolean;
//   userId: number;
// }

interface Props {
  userId: number;
  users: Users[];
}

export const UserInfo: React.FC<Props> = ({ userId, users }) => {
  const author = users.find(user => user.id === userId) || null;

  return (
    <>
      <a className="UserInfo" href={`mailto:${author?.email}`}>
        {author?.name}
      </a>
    </>
  );
};
