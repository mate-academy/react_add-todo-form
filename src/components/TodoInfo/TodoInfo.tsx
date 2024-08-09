import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/types';
import classNames from 'classnames';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
