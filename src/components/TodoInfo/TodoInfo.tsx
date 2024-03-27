import cn from 'classnames';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { id, userId, completed, title },
}) => {
  const todoUser = usersFromServer.find(user => user.id === userId) || null;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {todoUser && <UserInfo user={todoUser} />}
    </article>
  );
};
