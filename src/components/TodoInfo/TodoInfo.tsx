import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { FC } from 'react';
import { TodoWithUser } from '../../types/Types';

export const TodoInfo: FC<{ todo: TodoWithUser }> = ({ todo }) => {
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
