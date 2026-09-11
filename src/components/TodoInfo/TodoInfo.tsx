import React from 'react';
import { Todo } from '../../sourse/Todo';
import { User } from '../../sourse/User';
import { UserInfo } from '../UserInfo';

type Props = Todo & { user?: User };

export const TodoInfo = ({ todo }: { todo: Props }) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user ? <UserInfo user={todo.user} /> : null}
  </article>
);
