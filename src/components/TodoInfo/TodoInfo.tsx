import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, id, completed, userId } = todo;

  const currentUser = usersFromServer.find((user: User) => user.id === userId);

  if (!currentUser) {
    return null;
  }

  return (
    <article
      key={id}
      data-id={id}
      className={`
        TodoInfo
        ${completed && 'TodoInfo--completed'}
      `}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={currentUser} />
    </article>
  );
};
