import classNames from 'classnames';
import React from 'react';
import { User, Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

type Props = {
  users: User[],
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo',
        { 'TodoInfo--completed': todo.completed })}
    >
      <UserInfo usersFromServer={users} todo={todo} />
    </article>
  );
};
