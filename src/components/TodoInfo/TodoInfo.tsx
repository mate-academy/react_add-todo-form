import cn from 'classnames';
import { TodoAggregate } from '../../domain/TodoAggregate';
import { UserInfo } from '../UserInfo';

type TodoinfoProps = {
  todo: TodoAggregate;
};

export const TodoInfo = ({ todo }: TodoinfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
