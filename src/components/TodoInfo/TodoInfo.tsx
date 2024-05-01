import classNames from 'classnames';

import usersFromServer from '../../api/users';

import { UserInfo } from '../UserInfo';

import { Todo } from '../../types/todo';
import { User } from '../../types/user';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { userId, id, completed, title } = todo;
  const findUser = (): User | undefined => {
    return usersFromServer.find((user: User) => user.id === +userId);
  };

  const user = findUser();

  if (!user) {
    return null;
  }

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
