import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';
import React from 'react';
import classNames from 'classnames';

export const TodoInfo = ({ todo }: Props) => {
  const todoClasses = classNames('TodoInfo', {
    'TodoInfo--completed': todo.completed,
  });

  return (
    <article className={todoClasses} key={todo.id} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};

type Props = {
  todo: Todo;
};
