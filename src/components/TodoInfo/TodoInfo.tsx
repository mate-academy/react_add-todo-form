import classNames from 'classnames';
import { User, UserInfo } from '../UserInfo';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

type TodoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames(
      'TodoInfo',
      { 'TodoInfo--completed': todo.completed },
    )}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
