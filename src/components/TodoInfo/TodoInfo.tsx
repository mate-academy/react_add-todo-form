import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo, User } from '../../react-app-env';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const selectedUser: User | null = usersFromServer.find(
    user => (user.id === todo.userId),
  ) || null;

  return (
    <li
      className={classNames(
        'TodoInfo', { 'TodoInfo--completed': todo.completed },
      )}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {selectedUser
        && <UserInfo user={selectedUser} />}
    </li>
  );
};
