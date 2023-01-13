import React from 'react';
import './todoInfo.scss';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Todo';

type Todos = {
  todo: Todo;
};

export const TodoInfo: React.FC<Todos> = ({ todo }) => {
  const {
    title,
    user,
    completed,
  } = todo;

  return (
    <article
      className={cn(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {`${title}`}
      </h2>

      {user && (
        <UserInfo
          user={user}
        />
      )}
    </article>
  );
};
