import React from 'react';
import { UserInfo } from '../UserInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
}

interface TodoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <>
      <article
        key={todo.id}
        data-id={todo.id}
        className={`TodoInfo ${
          todo.completed === true ? 'TodoInfo--completed' : ''
        }`}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>

        <UserInfo user={todo.user} />
      </article>
    </>
  );
};
