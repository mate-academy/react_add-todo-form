import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
  users: User[];
}

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  const userAtTodo = users.find(user => todo.userId === user.id) as User;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={userAtTodo} />
    </article>
  );
};
