import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
