import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo, User } from '../../types';
import usersFromServer from '../../api/users';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const chosenUser: User | undefined = usersFromServer.find(
    userFromServer => userFromServer.id === todo.userId,
  );

  if (!chosenUser) {
    return;
  }

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={chosenUser} />
    </article>
  );
};
