import usersFromServer from '../../api/users';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUser(todo.userId);

  return (
    <article data-id="1" className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
