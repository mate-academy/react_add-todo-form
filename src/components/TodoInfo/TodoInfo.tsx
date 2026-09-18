import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';

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
  user: User;
};

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <div
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </div>
  );
};
