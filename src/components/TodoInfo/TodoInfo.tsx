import './TodoInfo.scss';
import { TodoAggregate } from '../../types/TodoAggregate';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

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

      <UserInfo user={todo.user} />
    </article>
  );
};
