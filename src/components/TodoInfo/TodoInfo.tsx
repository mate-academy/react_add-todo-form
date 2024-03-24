import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { Todo, User } from '../../types/Todo';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;
  const currentUser = usersFromServer.find(user => user.id === userId) as User;

  return (
    <article
      key={id}
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={currentUser} />
    </article>
  );
};
