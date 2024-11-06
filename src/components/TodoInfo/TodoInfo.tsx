import cn from 'classnames';
import { UserInfo } from '../UserInfo';

interface User {
  name: string;
  email: string;
}

interface Todo {
  [x: string]: unknown;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  const { title, completed } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
