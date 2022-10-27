import React from 'react';
import { Users, Todo } from '../TodoList';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  usersFromServer: Users[],
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo, usersFromServer }) => {
  return (
    <article data-id={todo.id} className="TodoInfo TodoInfo--completed">
      <UserInfo usersFromServer={usersFromServer} todo={todo} />
    </article>
  );
};
