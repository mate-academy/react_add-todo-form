import React from 'react';
import { User, UserInfo } from '../UserInfo';
import classNames from 'classnames';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { id, title, completed = false, user },
}) => {
  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
