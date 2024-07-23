import usersFromServer from '../../api/users';
import React from 'react';
import { Todos } from '../../type/Todos';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const users = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {users && (
        <a className="UserInfo" href={`mailto:${users.email}`}>
          {users.name}
        </a>
      )}
    </article>
  );
};
