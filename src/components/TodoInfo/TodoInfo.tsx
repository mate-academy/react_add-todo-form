import classNames from 'classnames';
import React from 'react';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user: User | undefined = usersFromServer.find(
    u => u.id === todo.userId,
  );

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
