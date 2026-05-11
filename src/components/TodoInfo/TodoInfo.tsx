import { UserInfo } from '../UserInfo/UserInfo';
import { TodoAggregate } from '../../entities/todo/domain/TodoAggregate';

import cn from 'classnames';
import './TodoInfo.scss';

type TodoCardProps = {
  todo: TodoAggregate;
};

export function TodoInfo({ todo }: TodoCardProps) {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
}
