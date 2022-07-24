import classNames from 'classnames';
import { User, UserInfo } from '../UserInfo/UserInfo';

export interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user?: User | null,
}

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, title, completed } = todo;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user
        ? <UserInfo user={user} />
        : 'waiting for user info'}
    </article>
  );
};
