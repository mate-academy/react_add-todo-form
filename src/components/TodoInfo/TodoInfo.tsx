import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

type TodoInfoProps = {
  todo: Todo,
  user: User | undefined,
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo',
        { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
