import React from 'react';
import { UserInfo } from '../UserInfo';
import { INewTodo } from '../../interfaces/INewTodo';

type Prop = {
  todo: INewTodo;
};

export const TodoInfo: React.FC<Prop> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
