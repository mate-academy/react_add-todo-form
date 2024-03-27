import cn from 'classnames';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const user = usersFromServer.find(userFind => userFind.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {
        user && <UserInfo user={user} />
      }
      
    </article>
  );
};
