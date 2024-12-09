import { Todo } from '../TodoList';
import { User, UserInfo } from '../UserInfo';
import classNames from 'classnames';

export interface TodoWithUser {
  id: number;
  title: string;
  completed: boolean;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
}

export const TodoInfo: React.FC<{ todo: TodoWithUser }> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user ? <UserInfo user={todo.user} /> : <span>Unknown user</span>}
    </article>
  );
};
