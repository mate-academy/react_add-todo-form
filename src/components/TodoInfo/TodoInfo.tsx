import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

interface Todos {
  user: User;
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

type Props = {
  todo: Todos,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    completed, id, user, title,
  } = todo;

  return (
    <article
      data-id={id}
      key={id}
      className={
        classNames(
          'TodoInfo',
          { 'TodoInfo--completed': completed === true },
        )
      }
    >

      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />

    </article>
  );
};
