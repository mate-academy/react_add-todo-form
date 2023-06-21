import { FC } from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { FullTodo } from '../../types';

interface Props {
  todo: FullTodo;
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  const { completed, user, title } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn(
        'TodoInfo', {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}

    </article>
  );
};
