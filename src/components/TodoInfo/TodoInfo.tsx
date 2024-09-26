import cn from 'classnames';
import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';
import { Task } from '../../types/Task';
import React from 'react';

type Props = {
  todo: Task;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
