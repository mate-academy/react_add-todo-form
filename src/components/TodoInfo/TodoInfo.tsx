import { PreparedTodo } from '../../types/PreparedTodo';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

type Props = {
  todo: PreparedTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
