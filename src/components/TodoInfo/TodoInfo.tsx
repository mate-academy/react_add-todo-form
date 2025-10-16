import type { FC } from 'react';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';
import { TodoUserAggregate } from '../../types/TodoUserAggregate';

type Props = {
  todo: TodoUserAggregate;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user ? (
        <UserInfo user={user} />
      ) : (
        <div className="TodoInfo__no-user">No user data</div>
      )}
    </article>
  );
};
