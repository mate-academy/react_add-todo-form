import React from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const currentUser =
    usersFromServer.find(user => user.id === todo.userId) || null;
  const todoClass = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  return (
    <article key={todo.id} className={todoClass} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {currentUser && <UserInfo user={currentUser} />}
    </article>
  );
};
