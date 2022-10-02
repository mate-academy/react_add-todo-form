import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

export const TodoInfo: React.FC<Todo> = ({
  title,
  completed,
  user,
}) => {
  return (
    <article
      data-id="1"
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {
        user && (
          <UserInfo
            name={user.name}
            email={user.email}
            id={user.id}
            username={user.username}
          />
        )
      }

    </article>
  );
};
