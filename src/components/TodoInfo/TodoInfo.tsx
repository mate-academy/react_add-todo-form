import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo userId={userId} />
    </article>
  );
};
