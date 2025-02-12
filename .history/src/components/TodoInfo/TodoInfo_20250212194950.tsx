import React from 'react';
import { UserInfo } from '../UserInfo';
import { ITodo } from '../../interfaces/ITodo';
import users from '../../api/users';

type Prop = {
  todo: ITodo;
};

export const TodoInfo: React.FC<Prop> = ({ todo }) => {
  const user = users.find(item => item.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user ? <UserInfo user={user} /> : <p>User not found</p>}
    </article>
  );
};
