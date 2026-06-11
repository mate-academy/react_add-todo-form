import React from 'react';
import { UserInfo } from '../UserInfo';
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user?: User | null;
}

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
