import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import Todo from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={`TodoInfo ${todo.completed === true ? 'TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo.user} />
  </article>
);
