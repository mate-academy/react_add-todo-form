import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/todo';
import { getUserById } from '../../services/user';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    title,
    completed = false,
    id,
    userId,

  },
}) => {
  const user = getUserById(userId);

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed === true },
      )}
      key={id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
