import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../App';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user, id } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
