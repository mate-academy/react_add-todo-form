import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    userId,
  } = todo;
  const user = getUserById(userId);

  return (
    <article
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
      key={id}
      data-id={id}
    >
      <h2 className="TodoInfo__title">{`${title}`}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
