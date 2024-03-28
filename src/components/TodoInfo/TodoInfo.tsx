import cn from 'classnames';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const { completed, id, title, userId } = todo;
  const user = usersFromServer.find(userFind => userFind.id === userId);

  return (
    <article
      data-id={id}
      key={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
