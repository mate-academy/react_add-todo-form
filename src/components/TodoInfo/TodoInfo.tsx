import React from 'react';
import classNames from 'classnames';
import { PreparedTodo } from '../../types/PreparedTodo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: PreparedTodo;
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({ todo }) => {
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
          'card has-background-white-ter',
          'TodoInfo',
          { 'TodoInfo--completed': completed },
        )}
      >
        <h2 className="TodoInfo__title card-header-title">
          {title}
        </h2>

        {user && (
          <UserInfo user={user} />
        )}
      </article>
    );
  },
);
