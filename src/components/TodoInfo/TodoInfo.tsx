import React from 'react';
import classNames from 'classnames';
import { Todo, User } from '../types/types';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { user, completed } = todo;

  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={classNames('TodoInfo',
        {
          'TodoInfo--completed': completed,
        })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user as User} />
    </article>
  );
};
