import React from 'react';
import { FullTodo } from '../../types/FullTodo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: FullTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
    <UserInfo
      user={todo.user}
    />
  </article>
);
