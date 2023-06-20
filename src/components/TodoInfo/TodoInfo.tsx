import cn from 'classnames';
import { FC } from 'react';
import { TodoWithUser } from '../../Types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo:FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo box p-3 has-text-danger', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2
        className={cn('TodoInfo__title is-size-5 has-text-weight-bold', {
          'has-text-success': completed,
        })}
      >
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
