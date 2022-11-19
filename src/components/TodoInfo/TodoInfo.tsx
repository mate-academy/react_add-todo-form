import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type ToDo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

type Props = {
  user?: User,
  todo: ToDo,
};

export const TodoInfo: React.FC<Props> = ({ user, todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};
