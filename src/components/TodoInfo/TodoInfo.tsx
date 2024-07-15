import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { User } from '../../types/user';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const { id, title, userId, completed } = todo;
  const user = usersFromServer.find(el => el.id === userId);

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user as User} />
    </article>
  );
};
