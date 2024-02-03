import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo,
};

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article data-id="15" className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}>
      <h2
        className="TodoInfo__title"
        data-id={todo.id}
      >
        {todo.title}
      </h2>

      {!!user && <UserInfo user={user} />}
    </article>
  );
};
