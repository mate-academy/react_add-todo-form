import { FC } from 'react';

import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo:FC<Props> = ({ todo }) => {
  const {
    title,
    completed = false,
    user,
    id,
  } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={cn(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
