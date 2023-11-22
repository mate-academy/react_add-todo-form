import { Todo } from '../../types/todo';
import { getUserById } from '../../utils/todoUtils';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const user = getUserById(users, userId);

  return (
    <article data-id={id} className={`TodoInfo ${completed && 'TodoInfo--completed'}`}>
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
