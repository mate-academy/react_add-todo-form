import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todos } from '../../types/TodosType';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user ? <UserInfo user={todo.user} /> : null}
    </article>
  );
};
