import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

interface Proprs {
  todo: Todo;
}

export const TodoInfo: React.FC<Proprs> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
