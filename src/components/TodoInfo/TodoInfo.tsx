import React from 'react';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = users.find(item => item.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
