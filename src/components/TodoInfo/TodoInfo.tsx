import React from 'react';
import classNames from 'classnames';

import { Todo } from '../Types/Todo';
import { UserInfo } from '../UserInfo';

import './TodoInfo.scss';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    id,
    title,
    completed = true,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
      key={id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>

  );
};
