import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';
import { findUserById } from '../../services/user';

interface Props {
  todo: Todo;
}
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    userId,
    completed,
  } = todo;

  const user = findUserById(userId, users);

  return (
    <article
      data-id={todo.id}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': completed === true },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
