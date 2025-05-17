import React from 'react';
import { User } from '../../types/user';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/todo';

interface TodoInfoProps {
  todo: Todo & {
    user: User;
  };
}

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
