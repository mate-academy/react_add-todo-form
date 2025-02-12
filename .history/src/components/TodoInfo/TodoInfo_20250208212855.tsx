import React from 'react';
import { UserInfo } from '../UserInfo';
import { ITodo } from '../../interfaces/ITodo';

type Prop = {
  todo: ITodo;
};

export const TodoInfo: React.FC<Prop> = ({ todo }) => {
  return (
    <article data-id={todo.id} className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo />
    </article>
  );
};
