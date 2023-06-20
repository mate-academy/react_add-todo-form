import { FC } from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
}

const findUser = (todo: Todo) => {
  return usersFromServer.find((user: User) => user.id === todo.userId) || null;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const user = findUser(todo);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
