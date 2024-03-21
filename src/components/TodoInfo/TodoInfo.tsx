import React from 'react';
import { TodoInfoProps } from '../../Types';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user ? <UserInfo user={todo.user} /> : <p>No user found</p>}
    </article>
  );
};
