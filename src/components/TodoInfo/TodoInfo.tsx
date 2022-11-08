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
  foundUser: User | undefined,
  todo: ToDo,
};

export const TodoInfo: React.FC<Props> = ({ foundUser, todo }) => {
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
      <UserInfo user={foundUser} />
    </article>
  );
};
