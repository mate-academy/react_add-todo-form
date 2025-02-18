import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo = ({ todo }: Props) => (
  <>
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user || null} />
    </article>
  </>
);
