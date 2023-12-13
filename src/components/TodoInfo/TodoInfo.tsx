import cn from 'classnames';
import { Todos } from '../../types';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

interface PropsTodos {
  todo: Todos;
}

export const TodoInfo: React.FC<PropsTodos> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const selectedUser = usersFromServer.find(user => user.id === userId);

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

      {selectedUser && <UserInfo user={selectedUser} />}
    </article>
  );
};
