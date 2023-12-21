import React from 'react';
import { Todos } from '../../types/todos';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article data-id={todo.id} className="TodoInfo TodoInfo--completed">
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
    <UserInfo userId={todo.userId} />
  </article>
);
