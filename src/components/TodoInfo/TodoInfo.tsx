import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
  user?: User;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const safeUser = user || usersFromServer.find(u => u.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={safeUser} />
    </article>
  );
};
