import cn from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/todos';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <li>
      <article
        data-id={todo.id}
        className={cn('TodoInfo', {
          'TodoInfo--completed': completed,
        })}
      >
        <h2 className="TodoInfo__title">{title}</h2>

        {user && <UserInfo user={user} />}
      </article>
    </li>
  );
};
