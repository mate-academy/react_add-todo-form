import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
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
    {todo.user && todo.user.email ? (
      <a className="UserInfo" href={`mailto:${todo.user.email}`}>
        {todo.user.name}
      </a>
    ) : (
      <span className="UserInfo">User not available</span>
    )}
  </article>
);
