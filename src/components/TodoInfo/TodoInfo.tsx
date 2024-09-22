import { UserInfo } from '../UserInfo';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React from 'react';
import users from '../../api/users';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = users.find((u: User) => u.id === todo.userId);

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
