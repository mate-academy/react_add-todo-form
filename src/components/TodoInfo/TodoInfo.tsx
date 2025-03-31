import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  if (!user) {
    return;
  }

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
