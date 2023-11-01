import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/User';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={getUserById(todo.userId) as User} />
      {/* <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a> */}
    </article>
  );
};
