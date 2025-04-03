import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
