import classNames from 'classnames';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
  user: User;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const todoClass = classNames('TodoInfo', {
    'TodoInfo--completed': todo.completed,
  });

  return (
    <article data-id="1" className={todoClass}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
