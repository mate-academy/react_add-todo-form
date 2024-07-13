import React from 'react';
import classNames from 'classnames';
import usersFromServer from '../../api/users';
import { TodoInfoProps } from '../../types/types';

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const foundUser = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {foundUser && (
        <p className="TodoInfo__user">
          Assigned to: {foundUser.name} ({foundUser.email})
        </p>
      )}
    </article>
  );
};
