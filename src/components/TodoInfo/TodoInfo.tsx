import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../Todo';
import { User } from '../User';

type Props = {
  user: User
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ user, todo }) => {
  const { title, id, completed } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
