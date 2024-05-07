import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodosProps } from '../../types/Todo';
import { UsersProps } from '../../types/User';

export const TodoInfo: React.FC<{todo: TodosProps, users: UsersProps[]}> = ({ todo, users }) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className={classNames('TodoInfo__title')}>{todo.title}</h2>

      {users
        .filter(user => todo.userId === user.id)
        .map(user => (
          <UserInfo user={user} key={user.id} />
        ))}

  </article>
);
