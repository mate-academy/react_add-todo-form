import classNames from 'classnames';
import React from 'react';
import { UserInfo, Users } from '../UserInfo';

export interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: Users | null,
}

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >

      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
