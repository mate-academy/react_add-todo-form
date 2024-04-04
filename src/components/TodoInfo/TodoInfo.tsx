import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import classNames from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = usersFromServer.find(person => person.id === todo.userId);

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
