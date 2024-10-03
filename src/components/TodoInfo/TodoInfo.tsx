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

  const { id, completed, title } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
