import { FC } from 'react';
import cn from 'classnames';
import { Todos } from '../../types/types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo
          key={user.id}
          user={user}
        />
      )}
    </article>
  );
};
