import cn from 'classnames';
import User from '../../types/User';
import { UserInfo } from '../UserInfo';
import Todo from '../../types/Todo';
import usersFromServer from '../../api/users';

interface Props {
  todo: Todo
}

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id, title, completed, userId,
  },
}) => {
  const user: User | undefined
    = usersFromServer.find((us: User) => us.id === userId);

  if (user) {
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

        <UserInfo user={user} />
      </article>
    );
  }

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

      <p>No user information available</p>
    </article>
  );
};
