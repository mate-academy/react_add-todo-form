import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../services/TodoWithUser';
import cn from 'classnames';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user !== undefined && <UserInfo user={todo.user} />}
    </article>
  );
};
