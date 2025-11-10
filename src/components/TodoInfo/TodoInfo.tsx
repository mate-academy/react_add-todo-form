import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../../types.ts/User';
import { Todo } from '../../types.ts/Todo';

type Props = {
  todo: Todo;
  users: User[];
};

function findUserById(users: User[], id: number) {
  return users.find((user: User) => user.id === id);
}

export const TodoInfo = ({ todo, users }: Props) => {
  const user = todo.user || findUserById(users, todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${classNames({ 'TodoInfo--completed': todo.completed })}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user ? <UserInfo user={user} /> : <p>User is not defined</p>}
    </article>
  );
};
