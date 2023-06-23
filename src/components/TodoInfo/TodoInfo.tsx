import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo, User } from '../../interfaces';

export type TodoInfoProps = {
  todo: Todo;
  user: User;
};

export const TodoInfo:React.FC<TodoInfoProps> = React.memo(({ todo, user }) => {
  return (
    <article data-id={todo.id} className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  );
});
