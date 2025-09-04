import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

export const TodoInfo = ({ todo }: { todo: Todo }) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user ? <UserInfo user={todo.user} /> : <span>No user</span>}
  </article>
);
