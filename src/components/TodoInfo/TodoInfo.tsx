import React from 'react';
import classNames from 'classnames';

import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/ToDo';

// import './ToDoInfo.scss';

type Props = {
  todo: Todo
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
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
      data-id={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
