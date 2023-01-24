import React from 'react';
import cn from 'classnames';

import './todoinfo.scss';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    user,
    id,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </article>
  );
};
