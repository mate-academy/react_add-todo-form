import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { title, user, completed } = todo;

  const className = completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo';

  return (
    <article data-id="1" className={className}>
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
