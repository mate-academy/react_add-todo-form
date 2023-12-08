import { FC } from 'react';
import cn from 'classnames';

import './TodoInfo.scss';
import { TodoInfoProps } from '../../types/TodoInfoTypes';
import { UserInfo } from '../UserInfo';

export const TodoInfo: FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
