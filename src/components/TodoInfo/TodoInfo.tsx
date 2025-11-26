import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../App';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { title, completed, user } = todo;
  const todoClass = completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo';

  return (
    <article className={todoClass} data-id={todo.id}>
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
