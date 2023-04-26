import { FC } from 'react';
import './TodoInfo.scss';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    title,
    user,
    id,
    completed,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo',
        { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
