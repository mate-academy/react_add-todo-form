import React from 'react';
import { Todo } from '../../App';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type PropsInfoTodo = {
  todo: Todo;
};

export const TodoInfo: React.FC<PropsInfoTodo> = ({ todo }) => {
  const user = usersFromServer.find(
    userFromApi => userFromApi.id === todo.userId,
  );

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
