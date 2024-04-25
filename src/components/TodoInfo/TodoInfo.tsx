import cn from 'classnames';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';
import { findUser } from '../../utils/functions';
import users from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = findUser(todo.userId, users);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
