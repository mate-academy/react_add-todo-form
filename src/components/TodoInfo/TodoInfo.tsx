import React from 'react';
import { Todo } from '../type/Todo';
import { UserInfo } from '../UserInfo';

type TodosList = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodosList> = ({ todo }) => {
  return (
    <article
      data-id="1"
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
