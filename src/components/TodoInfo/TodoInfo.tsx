import { UserInfo } from '../UserInfo';
import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todos';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({
  todo: { title, id, user, completed },
}) => (
  <article
    data-id={id}
    className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {user && <UserInfo user={user} />}
  </article>
);
