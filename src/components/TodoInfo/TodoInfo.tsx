import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../type/todoInfo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed = false,
    user,
  },
}) => {
  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo', { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
          {title.trim()}
      </h2>

      {user && <UserInfo user={user} />}

    </article>
  );
};
