import cn from 'classnames';
import { Todo } from '../../types';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = usersFromServer.find((userItem) => userItem.id === todo.userId);

  if (user === undefined) {
    throw new TypeError('User not found');
  }

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

      <UserInfo user={user} />
      <div>{todo.id}</div>
    </article>
  );
};
