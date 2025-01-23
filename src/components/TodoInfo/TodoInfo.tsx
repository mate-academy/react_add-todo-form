import React from 'react';

interface Props {
  title: string;
  completed: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => {
  return (
    <article className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">{title}</h2>
      <a href={`mailto:${user.email}`} className="UserInfo">
        {user.name}
      </a>
    </article>
  );
};
