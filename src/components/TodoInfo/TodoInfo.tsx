import cn from 'classnames';
import { FC } from 'react';
import { TodoWithUser } from '../../Types';
import { UserInfo } from '../UserInfo';

interface Props {
  todoItem: TodoWithUser;
}

export const TodoInfo:FC<Props> = ({ todoItem }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todoItem;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
