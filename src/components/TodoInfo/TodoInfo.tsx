import cn from 'classnames';
import { Todo, User } from '../../utils/types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
  user?: User;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
