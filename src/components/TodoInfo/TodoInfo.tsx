import cl from 'classnames';
import users from '../../api/users';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user: User | undefined = users.find(usr => usr.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cl('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
