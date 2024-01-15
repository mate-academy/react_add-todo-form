import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import getUserById from '../../services/userService';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId)
  || null;

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && (<UserInfo user={user} />)}
    </article>
  );
};
