import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }: Todo) => {
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
