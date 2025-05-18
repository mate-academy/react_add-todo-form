import React from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

type TodoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  const user: User | undefined = usersFromServer.find(
    u => u.id === todo.userId,
  );

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
