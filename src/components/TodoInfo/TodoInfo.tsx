import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../App';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const statusClass = todo.completed ? 'TodoInfo--completed' : '';

  return (
    <article data-id={todo.id} className={`TodoInfo ${statusClass}`.trim()}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
