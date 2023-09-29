import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';
import { findUser } from '../../services';

type Props = { todo: Todo };

export const TodoInfo: FC<Props> = ({ todo }) => {
  const user = findUser(todo.userId, users);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
