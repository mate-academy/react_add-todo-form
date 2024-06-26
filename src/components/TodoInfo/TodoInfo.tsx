import cn from 'classnames';

import usersFromServer from '../../api/users';
import React from 'react';
import { ToDo } from '../../components/Types/ToDo';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const users = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
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
