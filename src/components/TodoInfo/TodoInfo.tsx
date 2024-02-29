import cn from 'classnames';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoAuthor =
    usersFromServer.find(user => user.id === todo.userId) || null;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todoAuthor && <UserInfo user={todoAuthor} />}
    </article>
  );
};
