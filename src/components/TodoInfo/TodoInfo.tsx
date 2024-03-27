import React from 'react';
import UserInfo, { User } from '../UserInfo/UserInfo';

interface TodoGeneral {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}

export const TodoInfo: React.FC<{ todo: TodoGeneral }> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};

export default TodoInfo;
