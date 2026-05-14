import React from 'react';
import { Todo } from '../../types/deal';
import clsx from 'clsx';

import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={clsx('TodoInfo', todo.completed && 'TodoInfo--completed')}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
