import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/getUserById';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
