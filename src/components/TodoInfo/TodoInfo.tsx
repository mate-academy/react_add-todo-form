import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';

import usersFromServer from '../../api/users';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { userId, id, completed, title },
}) => {
  const userFind = usersFromServer.find(user => user.id === userId);

  return (
    <article
      key={id}
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {userFind && <UserInfo user={userFind} />}
    </article>
  );
};
