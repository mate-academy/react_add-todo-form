import classNames from 'classnames';
import { findUserByTodoUserId } from '../../helpers/findUserByTodoUserId';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
  users: User[];
}

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  const {
    title, completed, userId, id,
  } = todo;

  const user = findUserByTodoUserId(users, userId);

  return (
    <article
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
      data-id={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
