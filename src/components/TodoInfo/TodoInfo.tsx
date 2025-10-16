import React from 'react';
import { UserInfo } from '../UserInfo';
import { UsersAndTodos } from '../../types/UsersAndTodos';

type TodoInfoProps = {
  todo: UsersAndTodos;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
