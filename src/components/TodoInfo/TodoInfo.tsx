import { FC } from 'react';
import cn from 'classnames';
import { ToDoWithusers } from '../../types/types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: ToDoWithusers;
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
  } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo',
        { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      { todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
