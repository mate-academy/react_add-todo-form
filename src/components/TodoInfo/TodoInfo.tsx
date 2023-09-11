import React from 'react';
import classnames from 'classnames';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title } = todo;

  return (
    <article
      data-id={id}
      className={classnames(
        'TodoInfo',
        {
          'TodoInfo--completed': todo.completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </article>
  );
};
