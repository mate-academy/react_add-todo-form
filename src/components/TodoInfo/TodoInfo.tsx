import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../types/TodoWithUser';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo.user} />
  </article>
);
