import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export function getUser(userId: number):User | null {
  const foundUser = usersFromServer.find(user => userId === user.id);

  return foundUser || null;
}

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const {
    title,
    userId,
    completed,
  } = todo;

  return (
    <article
      data-id={userId}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {getUser(userId) && <UserInfo user={getUser(userId)} />}
    </article>
  );
};
