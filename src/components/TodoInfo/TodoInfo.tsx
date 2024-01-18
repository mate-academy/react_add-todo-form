import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { PreparedTodo } from '../types/preparedTodo';

type Props = {
  todo: PreparedTodo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={`${todo.id}`}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
