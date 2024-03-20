import React from 'react';
import classNames from 'classnames';
import './TodoInfo.scss';

import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const isCompleted = todo.completed;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': isCompleted })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
