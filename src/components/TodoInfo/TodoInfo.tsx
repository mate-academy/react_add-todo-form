import React from 'react';
import { UserInfo } from '../UserInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  user: User; 
};

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h3 className="TodoInfo__title">{todo.title}</h3>

      {}
      <UserInfo user={todo.user} />
    </article>
  );
};




