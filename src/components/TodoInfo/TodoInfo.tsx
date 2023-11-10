import React from 'react';
import { Todo, User } from '../types/types';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
  user: User;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, user }) => {
  return (
    <article key={todo.id} data-id={todo.id} className="TodoInfo">
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
