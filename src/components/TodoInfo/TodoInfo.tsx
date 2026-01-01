import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
};

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
