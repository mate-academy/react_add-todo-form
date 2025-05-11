import React from 'react';
import { Todo } from '../TodoList';
import { User } from '../TodoList';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

export const TodoInfo: React.FC<{ todo: Todo; user: User | undefined }> = ({
  todo,
  user,
}) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
