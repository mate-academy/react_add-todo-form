import { FC } from 'react';
import cn from 'classnames';
import { ExtendedTodo } from '../../types/ExtendedTodo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ExtendedTodo;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    user,
    id,
    title,
    completed,
  } = todo;

  return (
    <li
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </li>
  );
};
