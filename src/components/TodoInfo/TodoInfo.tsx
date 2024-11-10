import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../types/User';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  user: User;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
