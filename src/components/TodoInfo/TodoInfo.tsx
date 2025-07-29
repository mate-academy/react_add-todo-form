import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
interface Props {
  todo: Todo;
}

export const TodoInfo = ({ todo }: Props) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2
      className={cn(
        'TodoInfo__title',
        todo.completed ? 'has-text-success' : 'has-text-info',
      )}
    >
      {todo.title}
    </h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
