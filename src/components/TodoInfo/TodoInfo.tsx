import React from 'react';
import { Todo } from '../types/Todo';
import { UserInfo } from '../UserInfo';
import usersFromService from '../../api/users';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const users = usersFromService.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {users && <UserInfo user={users} />}
    </article>
  );
};
