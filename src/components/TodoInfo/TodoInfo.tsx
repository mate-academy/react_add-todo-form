import React from 'react';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, user, completed = false, title } = todo;

  return (
    <article
      data-id={id}
      key={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
