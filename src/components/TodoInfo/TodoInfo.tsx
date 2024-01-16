import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoUser = usersFromServer.find(user => user.id === todo.userId)
    || null;

  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todoUser && (<UserInfo user={todoUser} />)}
    </article>
  );
};
