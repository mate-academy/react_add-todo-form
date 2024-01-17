import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { User, getUserById } from '../../types/User';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;
  const user: User | undefined = getUserById(usersFromServer, todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
