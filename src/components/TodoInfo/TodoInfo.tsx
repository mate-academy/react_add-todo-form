import React from 'react';
import { User, UserInfo } from '../UserInfo';

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};

type TodoProps = { todo: Todo };

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  const className = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  return (
    <article className={className} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
