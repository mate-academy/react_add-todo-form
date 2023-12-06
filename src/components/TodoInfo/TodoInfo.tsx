import { FC } from 'react';
import cn from 'classnames';
import { Todos } from '../../types/types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo?.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo?.user && (
        <UserInfo
          key={todo.user.id}
          user={todo.user}
        />
      )}
    </article>
  );
};
