import cn from 'classnames';
import './TodoInfo.scss';

import usersFromServer from '../../api/users';
import React from 'react';
import { ToDo } from '../../components/Types/ToDo';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const currentUser = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {currentUser && (
        <a className="UserInfo" href={`mailto:${currentUser.email}`}>
          {currentUser.name}
        </a>
      )}
    </article>
  );
};
