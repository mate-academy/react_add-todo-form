import cn from 'classnames';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoUser =
    usersFromServer.find(user => user.id === todo.userId) || null;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todoUser && <UserInfo user={todoUser} />}
    </article>
  );
};
