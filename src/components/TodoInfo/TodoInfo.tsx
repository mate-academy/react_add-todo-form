import React from 'react';
import CN from 'classnames';
import { Todos } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={CN('TodoInfo',
      { 'TodoInfo--completed': todo.completed })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
