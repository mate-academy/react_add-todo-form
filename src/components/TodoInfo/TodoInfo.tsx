import type { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const user = usersFromServer.find(
    currentUser => currentUser.id === todo.userId,
  );

  return (
    <article
      data-id={todo.id}
      className={
        todo.completed
          ? 'TodoInfo TodoInfo--completed'
          : 'TodoInfo'
      }
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
