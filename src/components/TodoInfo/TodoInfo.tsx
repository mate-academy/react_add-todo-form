import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/types';

export const TodoInfo: React.FC<Todo> = ({
  id,
  title,
  userId,
  completed = false,
}) => {
  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo
        userId={userId}
      />
    </article>
  );
};
