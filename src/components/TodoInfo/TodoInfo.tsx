import React from 'react';

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    user,
    userId,
  } = todo;

  return (
    <article
      data-id={userId}
      className={
        classNames(
          'TodoInfo',
          {
            'TodoInfo--completed': completed,
          },
        )
      }
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
