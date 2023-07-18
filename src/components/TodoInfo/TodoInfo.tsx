import React from 'react';

import classNames from 'classnames';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  completed: boolean,
  title: string,
  todoId: number,
  userId: number,
};

export const TodoInfo: React.FC<Props> = ({
  completed, title, todoId, userId,
}) => {
  const userDate = usersFromServer.find((user: User) => user.id === userId);

  return (
    <article
      data-id={todoId}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {userDate && <UserInfo user={userDate} />}
    </article>
  );
};
