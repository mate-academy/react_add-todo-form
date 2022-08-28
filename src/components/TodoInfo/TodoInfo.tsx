import React from 'react';
import className from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={className(
      'TodoInfo',
      {
        'TodoInfo--completed': todo.completed,
        'TodoInfo--not-ready': !todo.completed,
      },
    )}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {todo.user
      && <UserInfo user={todo.user} />}
  </article>
);
