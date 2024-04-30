import { TodoInterface } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

type TodoProps = {
  todo: TodoInterface;
  user: User;
};

export const TodoInfo: React.FC<TodoProps> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
