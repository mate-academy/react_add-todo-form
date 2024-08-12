import React from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/types';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const chosenUser = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {chosenUser && (
        <a className="UserInfo" href={`mailto:${chosenUser.email}`}>
          {chosenUser.name}
        </a>
      )}
    </article>
  );
};
