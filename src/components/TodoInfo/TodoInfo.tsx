import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  user: User
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
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
