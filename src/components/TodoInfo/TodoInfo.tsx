import cn from 'classnames';
import { TodoAggregate } from '../../domain/TodoAgregate';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: TodoAggregate;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
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
