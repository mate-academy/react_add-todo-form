import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
      key={todo.id}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{`${todo.title}`}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
