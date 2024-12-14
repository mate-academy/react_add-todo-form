import React from 'react';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo/UserInfo';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const user = usersFromServer.find(user => user.id === todo.userId);

  if (!user) {
    return null; // Handle cases where the user is not found
  }

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
