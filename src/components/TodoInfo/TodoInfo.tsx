import './TodoInfo.scss';

import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services';

type Props = {
  todo: Todo;
};

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
    userId,
  } = todo;

  const user = getUserById(userId);

  return (
    <article
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}

    </article>
  );
};
