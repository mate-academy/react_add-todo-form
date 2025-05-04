import classNames from 'classnames';
import { Todo } from '../TodoList';
import { User } from '../TodoList';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';

export type Props = {
  todo: Todo;
};

function getUser(userId: number): User | null {
  return users.find(user => user.id === userId) || null;
}

export const TodoInfo = ({ todo }: Props) => {
  const user = getUser(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user}></UserInfo>
    </article>
  );
};
