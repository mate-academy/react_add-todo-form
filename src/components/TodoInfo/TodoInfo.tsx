import React from 'react';
import cn from 'classnames';
import { User, UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User,
}

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'Todo-Info': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
