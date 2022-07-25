import React from 'react';
import { PreparedToDos } from '../../types/interfaces';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: PreparedToDos,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title title is-2 is-spaced">{todo.title}</h2>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
);
