import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} key={todo.user?.id} />}
    </article>
  );
};
