import React from 'react';
import { Todo } from '../../types/ToDo';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const user = usersFromServer.find(u => u.id === todo.userId) || null;

  return (
    <div
      data-cy="data-id"
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 data-cy="data-id" className={'TodoInfo__title'}>
        {todo.title}
      </h2>
      <UserInfo user={user} />
    </div>
  );
};
