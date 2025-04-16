import { Todos } from '../../types/Todos';
import { Users } from '../../types/Users';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todos;
};

const userById = (userId: number): Users => {
  return usersFromServer.find(user => user.id === userId) || usersFromServer[0];
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = userById(todo.userId);

  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
);
};
