import cn from 'classnames';
import usersFromServer from '../../api/users';

import { UserInfo } from '../UserInfo';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

function findUser(userId: number, users: User[]): User {
  const findedUser = users.find(user => user.id === userId);

  return !findedUser
    ? {
      id: 0,
      name: 'Anonymous',
      username: 'Anonymous',
      email: '',
    }
    : findedUser;
}

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    completed,
    title,
    userId,
  },
}) => {
  // const user = usersFromServer.find(usr => usr.id === userId);
  const user = findUser(userId, usersFromServer);

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};
