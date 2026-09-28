import React from 'react';
import { UserInfo } from '../UserInfo';

// Описываем структуру пользователя
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

// Описываем структуру задачи и экспортируем её
export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User; // Вместо any используем наш тип User
};

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
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
