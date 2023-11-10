import { FC } from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoItem } from '../../types/todo';

export const TodoInfo: FC<{ item: TodoItem }> = ({ item }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = item;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo userId={userId} />
    </article>
  );
};
