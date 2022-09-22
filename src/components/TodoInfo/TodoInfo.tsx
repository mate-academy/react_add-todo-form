import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../type/todo';
import { UserInfo } from '../UserInfo';

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

  const doneOrNot = classNames(
    'TodoInfo',
    { 'TodoInfo TodoInfo--completed': completed },
  );

  return (
    <article data-id={id} className={doneOrNot}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
