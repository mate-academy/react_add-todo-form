import React from 'react';
import classNames from 'classnames';
import { TodoWithUser } from '../types';
import { UserInfo } from '../UserInfo';

export type Props = {
  todo: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <article
      data-id={todo.id}
      key={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
