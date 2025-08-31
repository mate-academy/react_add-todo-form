import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && (
      <a className="UserInfo" href={`mailto:${todo.user.email}`}>
        {todo.user.name}
      </a>
    )}
  </article>
);
