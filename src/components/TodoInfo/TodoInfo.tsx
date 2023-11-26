import cn from 'classnames';

import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

interface TodoProps {
  todo: Todo,
}

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const user = usersFromServer.find(userItem => userItem.id === userId) || null;

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

      {user && <UserInfo user={user} />}
    </article>
  );
};
