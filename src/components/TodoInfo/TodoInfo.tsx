import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo'; // Переконайтеся, що шлях правильний

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <div className="UserInfo">
        <UserInfo user={todo.user} />
      </div>
    </div>
  );
};
