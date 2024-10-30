import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={cn('content', 'box', {
      'is-primary': todo.completed,
    })}
    data-id={todo.id}
  >
    <h3 className="TodoInfo__title">{todo.title}</h3>
    <UserInfo user={todo.user} />
  </article>
);
