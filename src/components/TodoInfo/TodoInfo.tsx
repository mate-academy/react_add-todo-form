import cn from 'classnames';

import { ITodoInfo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }: { todo: ITodoInfo }) => (
  <article
    data-id={todo.id}
    className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
