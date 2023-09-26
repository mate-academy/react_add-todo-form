import React from 'react';

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
    className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {!!user && (
      <UserInfo user={user} />
    )}
  </article>
);
