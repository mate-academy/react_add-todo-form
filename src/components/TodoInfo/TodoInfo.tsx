import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = React.memo(({ todo }) => {
  const {
    user,
    title,
    id,
    completed,
  } = todo;

  return (
    <article
      data-id={`${id}`}
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
});
