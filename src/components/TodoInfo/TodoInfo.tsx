import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

import './TodoInfo.scss';

type Props = {
  todo: Todo;
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
      className={classNames(
        'TodoInfo',
        { 'has-background-success-light  TodoInfo--completed': completed },
        { 'has-background-danger-light': !completed },
      )}
    >
      <h2
        className={classNames(
          'TodoInfo__title',
          { 'has-text-success': completed },
          { 'has-text-danger': !completed },
        )}
      >
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
