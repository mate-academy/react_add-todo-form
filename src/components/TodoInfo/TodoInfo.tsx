import React from 'react';

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article className={
    classNames(
      'TodoInfo',
      {
        'TodoInfo--completed': todo.completed,
      },
    )
  }
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
);
