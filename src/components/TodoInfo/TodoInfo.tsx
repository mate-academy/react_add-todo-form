import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';

interface Props {
  todo: Todo,
}

function getUserById(id: number): User | null {
  return usersFromServer.find((user: User) => user.id === id) || null;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={cn(
      'TodoInfo',
      { 'TodoInfo--completed': todo.completed },
    )}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
    <UserInfo user={getUserById(todo.userId)} />
  </article>
);
