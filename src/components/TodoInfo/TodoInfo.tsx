import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const userInfo: User | undefined = usersFromServer
    .find(user => user.id === todo.userId);

  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={userInfo} />
    </article>
  );
};
