import React from 'react';
import classNames from 'classnames';

import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

type Props = {
  todo: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id, completed, title, user,
  },
}) => (
  <article
    data-id={id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {!!user && (
      <UserInfo user={user} />
    )}
  </article>
);
