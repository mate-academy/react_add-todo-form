import React from 'react';

interface Props {
  id: number;
  title: string;
  completed: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => (
  <article className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
    <h2 className="TodoInfo__title">{title}</h2>
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  </article>
);
