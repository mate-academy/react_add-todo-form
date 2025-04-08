import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';

type TODO = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todo: TODO;
  findUserById: (n: number) => User;
};

export const TodoInfo: React.FC<Props> = ({ todo, findUserById }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo todo={todo} findUserById={findUserById} />
    </article>
  );
};
