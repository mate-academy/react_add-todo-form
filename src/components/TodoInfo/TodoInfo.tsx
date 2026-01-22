import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  users: User[];
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  const foundUser = users.find(usr => usr.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {foundUser && <UserInfo user={foundUser} key={foundUser.id} />}
    </article>
  );
};
