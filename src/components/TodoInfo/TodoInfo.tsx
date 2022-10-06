import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const userInfo: User | undefined
    = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={userInfo} />
    </article>
  );
};
