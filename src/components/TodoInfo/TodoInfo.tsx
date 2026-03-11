import cn from 'classnames';
import Todo from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoInterface {
  todo: Todo;
}

export const TodoInfo = ({ todo }: TodoInterface) => {
  const { user } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
