import React from 'react';
import { User, Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

type Props = {
  usersFromServer: User[],
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo, usersFromServer }) => {
  return (
    <article data-id={todo.id} className="TodoInfo TodoInfo--completed">
      <UserInfo usersFromServer={usersFromServer} todo={todo} />
    </article>
  );
};
