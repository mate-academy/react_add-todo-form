import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../UserInfo';

interface TodoI {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}

export const TodoInfo = ({ todo }: { todo: TodoI }) => {
  const { id, completed, title, user } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
