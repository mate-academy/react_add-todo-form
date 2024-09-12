import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const classForTodoInfo = cn({
    TodoInfo: true,
    'TodoInfo--completed': todo.completed,
  });

  return (
    <article data-id={todo.id} className={classForTodoInfo}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
