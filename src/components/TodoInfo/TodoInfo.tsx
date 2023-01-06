import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({ todo }) => {
    const {
      completed,
      title,
      user,
      id,
    } = todo;

    return (
      <article
        data-id={id}
        key={id}
        className={cn(
          'TodoInfo',
          { 'TodoInfo--completed': completed },
        )}
      >
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {user && <UserInfo user={user} />}
      </article>
    );
  },
);
