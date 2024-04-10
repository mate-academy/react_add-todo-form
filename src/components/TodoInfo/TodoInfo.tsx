import { FC } from 'react';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';
import { Todo } from '../types';

type Props = {
  todo: Todo;
};
export const TodoInfo: FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
