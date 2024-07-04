import React from 'react';
import cn from 'classnames';
import users from '../../api/users';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

function getUserById(userId: number) {
  return users.find(user => userId === user.id);
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
