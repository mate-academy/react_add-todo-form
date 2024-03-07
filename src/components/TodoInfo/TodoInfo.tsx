import cn from 'classnames';
import { Todo, User } from '../../types';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const user = usersFromServer.find((u: User) => u.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user ? <UserInfo user={user} /> : null}
    </article>
  );
};
