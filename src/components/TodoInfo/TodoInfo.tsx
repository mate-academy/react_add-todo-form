import { FC } from 'react';
import cn from 'classnames';
import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';
import { Todos } from '../../types/Todos';

type Props = {
  todo: Todos
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const { title, user } = todo;

  return (
    <article
      data-id="1"
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
