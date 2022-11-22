import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames(
      'TodoInfo',
      {
        'TodoInfo--completed': todo.completed,
      },
    )}
  >
    <h1 className="TodoInfo__title">
      {todo.title}
    </h1>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
