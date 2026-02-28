import classNames from 'classnames';
import '../../App.scss';
import { Todo } from '../../services/todo';
import { User } from '../../services/user';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
  user: User;
};

export const TodoInfo = ({ todo, user }: Props) => {
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
