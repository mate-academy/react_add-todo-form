import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import users from '../../api/users';

type Props = {
  todo: Todo;
};

const getUserById = (id: number): User | null => {
  return users.find(user => user.id === id) || null;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user
      && <UserInfo user={user} />}
    </article>
  );
};
