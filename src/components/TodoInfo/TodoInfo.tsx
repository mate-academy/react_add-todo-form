import cn from 'classnames';
import type { Todo } from '../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const todoClassName = cn('TodoInfo', {
    'TodoInfo--completed': todo.completed,
  });

  return (
    <article data-id={todo.id} className={todoClassName}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
