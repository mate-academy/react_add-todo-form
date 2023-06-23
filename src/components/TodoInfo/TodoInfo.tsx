import cn from 'classnames';
import { FC } from 'react';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

interface Props {
  todo: TodoWithUser,
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >

      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
