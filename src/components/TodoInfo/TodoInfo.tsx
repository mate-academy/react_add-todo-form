import cn from 'classnames';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

const findUser = (id: number) => {
  return usersFromServer.find((user: User) => user.id === id);
};

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  const {
    id,
    title,
    completed = false,
    userId,
  } = todo;
  const user = findUser(userId);

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
