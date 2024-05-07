import cn from 'classnames';

import usersFromServer from '../../api/users';
import { Todos } from '../Types/todoType';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, id, userId, completed } = todo;

  const user = usersFromServer.find(u => u.id === userId);

  return (
    <article
      key={id}
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
