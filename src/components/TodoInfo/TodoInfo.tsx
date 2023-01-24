import React, { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: FC<Props> = React.memo(
  ({ todo }) => {
    const { title, user, completed } = todo;

    return (
      <article
        data-id={todo.id}
        className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
      >
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {user && <UserInfo user={user} />}
      </article>
    );
  },
);
