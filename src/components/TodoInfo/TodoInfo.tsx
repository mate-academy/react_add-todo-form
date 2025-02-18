import cn from 'classnames';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;

  const todoUser = usersFromServer.find(user => user.id === userId);

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
      key={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {todoUser && <UserInfo user={todoUser} />}
    </article>
  );
};
