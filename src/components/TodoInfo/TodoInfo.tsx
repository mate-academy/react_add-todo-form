import { UserInfo } from '../UserInfo';
import '../../App.scss';
import { Post } from '../../types/post';
import React from 'react';

type TodoInfoProps = {
  todo: Post;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, user, title, completed } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
