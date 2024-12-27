import classNames from 'classnames';
import React from 'react';

import { UserInfo } from '../UserInfo';
import { Todo } from '../types/Todo';
import { getUserById } from '../utils/GetUserByld';
import { User } from '../types/User';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user: User = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
