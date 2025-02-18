import React from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type TodoInfoProps = {
  todo: Todo;
  user: User | undefined;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, user }) => {
  return (
    <article
      data-id="1"
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={user ? `mailto:${user.email}` : ''}>
        {user ? user.name : 'User not found'}
      </a>
    </article>
  );
};
