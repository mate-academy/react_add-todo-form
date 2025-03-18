import { Todo } from '../../interfaces';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
