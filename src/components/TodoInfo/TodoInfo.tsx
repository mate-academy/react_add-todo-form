import React from 'react';
import { UserInfo } from '../UserInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: {
    name: string;
    email: string;
  };
}

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo: todoItem }) => {
  return (
    <article
      data-id={todoItem.id}
      className={`TodoInfo ${todoItem.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todoItem.title}</h2>

      <UserInfo user={todoItem.user} />
    </article>
  );
};
