/* eslint-disable @typescript-eslint/comma-dangle */
import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../Types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
