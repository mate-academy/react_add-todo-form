import React from 'react';
import classNames from 'classnames';

import usersFromServer from '../../api/users';
import { Todo } from '../types/Todos';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = usersFromServer.find(us => us.id === todo.userId);
  const { id, completed, title } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </article>
  );
};
