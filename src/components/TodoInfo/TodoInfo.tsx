// export const TodoInfo = () => {};

import React from 'react';
import { ToDo } from '../../types/ToDo';
import { User } from '../../types/User';
import classNames from 'classnames';

import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const getUser = (id: number): User => {
    const user = usersFromServer.filter((userInfo: User) => userInfo.id === id);

    return user[0];
  };

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={getUser(todo.userId)} />
    </article>
  );
};
