import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const className = cn({
    TodoInfo: true,
    'TodoInfo--completed': todo.completed,
  });

  return (
    <article data-id={todo.id} className={className}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
