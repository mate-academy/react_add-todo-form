import React from 'react';
import { USERTODO } from '../../types/UserTodo';
import { UserInfo } from '../UserInfo';
type Props = {
  todo: USERTODO;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo  ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
