import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    (
      <article
        key={id}
        data-id={id}
        className={classnames({
          TodoInfo: true,
          'TodoInfo--completed': completed,
        })}
      >
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {user && <UserInfo user={user} />}
      </article>
    )
  );
};
