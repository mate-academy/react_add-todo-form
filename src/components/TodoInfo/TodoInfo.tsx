import React from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';
import { GetUser } from '../GetUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    completed,
    title,
    userId,
  },
}) => {
  const user = GetUser(userId);

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo box', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title label">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
