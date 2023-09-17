import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../helpers/getUserById';

interface Props {
  todo: Todo
}

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
