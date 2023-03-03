import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  const {
    id, title, completed, userId,
  } = todo;
  const selectedUser = usersFromServer.filter((user) => user.id === userId);

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={selectedUser[0]} />
    </article>
  );
};
