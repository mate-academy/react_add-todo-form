import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

import usersFromServer from '../../api/users';

export const TodoInfo: React.FC<Todo> = ({
  id,
  title,
  completed,
  userId,
}) => {
  const user = usersFromServer.find(todo => todo.id === userId);

  return (
    <article
      data-id={id}
      className={
        classNames(
          'TodoInfo',
          { 'TodoInfo--completed': completed },
        )
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
