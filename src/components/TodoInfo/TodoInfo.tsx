import classNames from 'classnames';
import React from 'react';
import { UserInfo, Users } from '../UserInfo';

export interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: Users,
}

type Props = {
  todo: Todos;
};

export function getMaxId(todo: Todos[]) {
  const maxId = Math.max(0, ...todo.map((item) => item.id));

  return maxId + 1;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={getMaxId([todo])}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >

      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
