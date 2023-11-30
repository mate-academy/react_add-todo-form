import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    completed, title, user, id,
  } = todo;

  return (
    <article
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
      data-id={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {!!user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
