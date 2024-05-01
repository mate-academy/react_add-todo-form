import classNames from 'classnames';

import usersFromServer from '../../api/users';

import { UserInfo } from '../UserInfo';

import { Todo } from '../../types/todo';
import { User } from '../../types/user';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const findUser = (): User | undefined => {
    return usersFromServer.find((user: User) => user.id === +todo.userId);
  };

  const user = findUser();

  if (!user) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
