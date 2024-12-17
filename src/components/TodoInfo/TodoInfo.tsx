import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Todo';
import './TodoInfo.scss';
import { User } from '../../Types/User';

type Props = {
  todo: Todo;
  todoUser: User | null;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { id, title, completed, user },
}) => {
  // const todoUser = usersFromServer.find(user => user.id === userId) || null;

  return (
    <article
      data-id={id}
      key={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
