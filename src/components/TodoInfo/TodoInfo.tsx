import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todos } from '../../types/Todos';

interface Props {
  todo: Todos;
}

export const TodoInfo: React.FC<Props> = ({ todo }): JSX.Element => (
  <article
    data-id={todo.id}
    className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
