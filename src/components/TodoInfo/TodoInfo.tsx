import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id + 1}
      key={todo.id}
      className={classNames(
        { 'TodoInfo--completed': todo.completed },
        'TodoInfo',
      )}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
