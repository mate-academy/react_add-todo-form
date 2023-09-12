import { FC } from 'react';
import cn from 'classnames';

import { TodoEntity } from '../../types/Todo';

import { UserInfo } from '../UserInfo';

type TTodoInfo = {
  todo: TodoEntity
};

export const TodoInfo: FC<TTodoInfo> = ({ todo }) => {
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

      <UserInfo user={user} />
    </article>
  );
};
