import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {users.map(
        user =>
          user.id === todo.userId && <UserInfo key={user.id} user={user} />,
      )}
    </article>
  );
};
