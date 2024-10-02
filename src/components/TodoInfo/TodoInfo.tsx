import classNames from 'classnames';
import { getUserById } from '../../services/userService';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user: User | null = getUserById(todo.userId);

  return (
    <article
      data-id="1"
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
