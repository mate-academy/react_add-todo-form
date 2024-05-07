import cn from 'classnames';

import { usersFromServer } from '../../api/users';
import { Todos } from '../Types/todoType';
import { UserInfo } from '../UserInfo';
import { UserMap } from '../Types/userType';

type Props = {
  todo: Todos;
};

const userMap: UserMap = {};

usersFromServer.forEach(user => {
  userMap[user.id] = user;
});

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, id, userId, completed } = todo;

  const user = userMap[userId];

  return (
    <article
      key={id}
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
