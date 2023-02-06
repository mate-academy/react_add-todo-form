import './TodoInfo.scss';

import classNames from 'classnames';
import React from 'react';
import { FullTodo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: FullTodo,
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
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
