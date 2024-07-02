import React from 'react';
<<<<<<< HEAD
import { UserInfo, User } from '../UserInfo';

interface TodoInfoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    user: User | null;
  };
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo.user} />
  </article>
);
=======
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
>>>>>>> 9a9744cbed8c7de13c378f61c6037a52c7e3c6ea
