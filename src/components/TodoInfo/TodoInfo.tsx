import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todos } from '../../Types/Todos';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={`
      TodoInfo
      ${todo.completed && 'TodoInfo--completed'}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
