import React from 'react';

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  userId: number;
  text: string;
  users: Users[];
}

export const TodoNewInfo: React.FC<Props> = ({ userId, text, users }) => {
  const seekName = users.find(user => {
    if (user.id === +userId) {
      return user.name;
    }

    return null;
  });

  return (
    <article className="TodoInfo">
      <h2 className="TodoInfo__title">{text}</h2>

      <a href={`mailto:${seekName?.email}`} className="UserInfo">
        {seekName?.name}
      </a>
    </article>
  );
};
