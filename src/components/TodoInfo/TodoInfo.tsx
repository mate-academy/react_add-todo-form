import classNames from 'classnames';
import React from 'react';
import { TodowithUser } from '../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodowithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed = false,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
