import { Todos } from '../../types/Todos';
import { Users } from '../../types/Users';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos;
  users: Users[];
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const user = users.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user ? (
        <UserInfo user={user} />
      ) : (
        <p className="TodoInfo__error">Unknown user</p>
      )}
    </article>
  );
};
