/* eslint-disable prettier/prettier */
import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo, User } from '../types';

interface TodoInfoProps {
  todo: Todo;
  user: User | undefined;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};

