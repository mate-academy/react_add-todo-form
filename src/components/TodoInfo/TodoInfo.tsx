import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { User } from '../../App';

interface Todo {
  id: number;
  completed: boolean;
  title: string;
  userId: number;
  user: User;
}

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, completed, title, user } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
