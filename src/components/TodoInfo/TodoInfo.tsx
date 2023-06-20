import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-cycle
import { UserInfo } from '../UserInfo';
// eslint-disable-next-line import/no-cycle
import { Todo } from '../../App';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    user,
    completed,
  } = todo;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      { user && <UserInfo user={user} />}
    </article>
  );
};
