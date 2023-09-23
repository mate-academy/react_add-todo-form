import React from 'react';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title, completed, id, user,
  } = todo;

  return (
    <article data-id={id} className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />

    </article>
  );
};
