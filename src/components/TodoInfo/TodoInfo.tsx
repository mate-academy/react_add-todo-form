import React from 'react';
import cn from 'classnames';
import { TodoWithUsers } from '../../type/TodoWithUsers';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUsers;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, user, id, completed } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
