import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import classNames from 'classnames';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user: User | undefined = usersFromServer.find(
    u => u.id === todo.userId,
  );

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user ? (
        <UserInfo key={todo.id} user={user} />
      ) : (
        <span className="UserInfo">Unknown User</span>
      )}
    </article>
  );
};
