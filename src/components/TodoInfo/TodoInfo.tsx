import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, completed, title, user,
  } = todo;

  return (
    <article data-id={`${id}`} className={cn('TodoInfo', { 'TodoInfo--completed': completed })}>
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (
        <UserInfo
          user={user}
        />
      )}
    </article>
  );
};
