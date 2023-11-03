import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={`
      TodoInfo
      ${todo.completed && 'TodoInfo--completed'}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
