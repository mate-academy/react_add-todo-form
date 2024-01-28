import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
