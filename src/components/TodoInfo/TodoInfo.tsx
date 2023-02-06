import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: FullTodo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title, completed, user, id,
  } = todo;

  return (
    <article
      data-id={`${id}`}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
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
