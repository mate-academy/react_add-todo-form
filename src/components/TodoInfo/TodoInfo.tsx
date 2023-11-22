import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Todo';
import usersFromServer from '../../api/users';
import { User } from '../../Types/User';

interface Props {
  todo: Todo
}
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoUser = usersFromServer.find(
    (user: User) => user.id === todo.userId,
  );

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todoUser && <UserInfo user={todoUser} />}
    </article>
  );
};
