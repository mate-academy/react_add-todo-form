import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    user,
    title,
    completed,
  } = todo;

  return (
    <article
      data-id={16}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed === true,
        },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
