import React from 'react';
import classnames from 'classnames';

import { PreparedTodo } from '../../types';

import { UserInfo } from '../UserInfo';

type Props = {
  todo: PreparedTodo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={classnames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
);
