import cn from 'classnames';
import { Todo } from '../../types/interfaces';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo = ({ todo }: Props) => (
  <article
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
