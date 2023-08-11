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
}) => (
  <article
    data-id={id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
  >
    <h2 className="TodoInfo__title">
      {title}
    </h2>

    <UserInfo user={GetUser(userId)} />
  </article>
);
