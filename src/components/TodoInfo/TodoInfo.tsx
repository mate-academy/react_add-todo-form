import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const findUser = (userId: number): User | undefined => {
    return usersFromServer.find(user => user.id === userId);
  };

  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={
        classNames('TodoInfo', { 'TodoInfo--completed': todo.completed })
      }
    >

      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo
        user={findUser(todo.userId)}
      />

    </article>
  );
};
