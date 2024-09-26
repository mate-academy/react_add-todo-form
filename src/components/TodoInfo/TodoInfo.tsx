import React from 'react';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { id, title, completed, userId },
}) => {
  const todoUser = usersFromServer.find(user => user.id === userId);

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {todoUser && <UserInfo user={todoUser} />}
    </article>
  );
};
