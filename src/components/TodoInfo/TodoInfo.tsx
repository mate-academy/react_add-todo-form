import { UserInfo } from '../UserInfo';
import React from 'react';
import { Todo } from '../../types/types';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <article
        data-id={todo.id}
        className={`TodoInfo ${todo.completed === true ? 'TodoInfo--completed' : ''}`}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>
        <UserInfo user={todo.user} />
      </article>
    </>
  );
};
