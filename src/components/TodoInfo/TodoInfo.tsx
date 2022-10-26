import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className="TodoInfo TodoInfo--completed"
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <UserInfo userId={todo.userId} />
  </article>
);
