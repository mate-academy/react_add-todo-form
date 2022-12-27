import type { FC } from 'react';

import cn from 'classnames';

import type { Todo } from '../../types/Todo';

import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};
export const TodoInfo: FC<Props> = ({ todo }) => {
  const { completed, title, user } = todo;

  return (
    <article
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
