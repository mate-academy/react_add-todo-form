import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};
interface TodoInfoProps {
  todo: Todo;
  user?: User;
}
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
export const TodoInfo = ({ todo, user }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
