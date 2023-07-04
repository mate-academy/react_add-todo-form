import { FC } from 'react';
import classNames from 'classnames';
import { TodoWithUser } from '../../types/TodoWithUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
);
