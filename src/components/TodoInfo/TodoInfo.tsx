import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo',
        { 'TodoInfo--completed': todo.completed })}
    >
      <h2
        className="TodoInfo__title"
        data-id={todo.id}
      >
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
