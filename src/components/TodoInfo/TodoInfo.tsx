import cn from 'classnames';

import { UserInfo } from '../UserInfo';

export interface Todo {
  user: {
    id: number,
    name: string,
    email: string,
    username: string,
  } | null,
  id: number,
  title: string,
  completed: boolean;
  userId: number;
}

export const TodoInfo = ({ todo }: { todo: Todo }) => (
  <article
    data-id={todo.id}
    className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
    {todo.user && <UserInfo user={todo.user} /> }
  </article>
);
