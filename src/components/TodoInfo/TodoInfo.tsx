import classNames from 'classnames';
import { UserInfo, User } from '../UserInfo';

export type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: User | null,
};

type Props = {
  todo: Todo,
};

export const TodoInfo = ({ todo }: Props) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
