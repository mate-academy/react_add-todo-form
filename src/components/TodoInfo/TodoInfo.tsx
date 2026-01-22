import React from 'react';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const foundUser = usersFromServer.find(usr => usr.id === todo.userId);

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
