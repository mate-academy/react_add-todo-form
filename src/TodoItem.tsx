import React from 'react';
import { Todo } from './types';
import classNames from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && (
        <a
          className="UserInfo"
          href={`mailto:${todo.user.email}`}
          data-cy="userInfo"
        >
          {todo.user.name}
        </a>
      )}
    </article>
  );
};
