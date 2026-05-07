import { TodoAggregated } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

interface TodoInfoProps {
  todo: TodoAggregated;
}

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
