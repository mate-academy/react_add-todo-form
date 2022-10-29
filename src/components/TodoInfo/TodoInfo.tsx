import React from 'react';
import classNames from 'classnames';
import { ToDo } from '../../types/ToDo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ToDo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    user,
    completed,
    id,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo',
        { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
