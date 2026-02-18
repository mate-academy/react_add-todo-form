import { UserInfo } from '../UserInfo/UserInfo';
import usersFromServer from '../../api/users';
import { Todo, User } from '../../App';
import cn from 'classnames';

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  const foundUser: User | undefined = usersFromServer.find(
    (user: User) => user.id === todo.userId,
  );

  if (!foundUser) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={foundUser} />
    </article>
  );
};
