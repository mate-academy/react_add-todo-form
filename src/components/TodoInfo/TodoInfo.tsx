import React from 'react';

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
  user: User;
}

interface Props {
  todo: Todo;
  children?: React.ReactNode;
}

export const TodoInfo: React.FC<Props> = ({ todo, children }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {children}
    </article>
  );
};
