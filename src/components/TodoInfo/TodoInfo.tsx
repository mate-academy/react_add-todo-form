import classNames from 'classnames';
import React from 'react';
import { TodoWithUser } from '../../types/TodoWithUserTypes';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    id,
    user,
    completed,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
