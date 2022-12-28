import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo card text-bg-danger bg-gradient bg-opacity-50 shadow p-2 m-3',
        { 'TodoInfo--completed bg-success': completed },
      )}
    >
      <h2 className="TodoInfo__title fs-5 text-dark">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
