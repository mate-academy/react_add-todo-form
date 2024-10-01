import React from 'react';
import cn from 'classnames';

import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { completed, title, user, id },
}) => (
  <article
    data-id={id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {user ? <UserInfo user={user} /> : null}
  </article>
);
