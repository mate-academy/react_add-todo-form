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
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      className={classNames(
        'TodoInfo',
        { 'has-background-success-light': !completed },
        { 'has-background-warning-light': completed },
      )}
    >
      <h2
        className={classNames(
          'TodoInfo__title',
          { 'has-text-success': !completed },
          { 'has-text-warning': completed },
        )}
      >
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
