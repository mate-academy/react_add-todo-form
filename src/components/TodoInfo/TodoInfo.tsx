import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/todo';

import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article className={classNames(
      'TodoInfo',
      {
        'TodoInfo--completed': todo.completed === true,
      },
    )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
