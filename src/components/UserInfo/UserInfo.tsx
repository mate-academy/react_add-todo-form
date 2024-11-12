import { Todos } from '../../types/Types';
import React from 'react';
import classNames from 'classnames';
import { findUserById } from '../../helper/findUsers';

type Props = {
  todos: Todos;
};

export const UserInfo: React.FC<Props> = ({ todos }) => {
  const userEmail = findUserById(todos.id);

  return (
    <article
      key={todos.id}
      data-id={todos.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todos.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todos.title}</h2>
      <a className="UserInfo" href={`mailto:${userEmail}`}>
        {userEmail?.email}
      </a>
    </article>
  );
};
