import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../services/TodoWithUser';
import cn from 'classnames';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
