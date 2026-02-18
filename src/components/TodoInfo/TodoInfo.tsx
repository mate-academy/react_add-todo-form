import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../App';
import cn from 'classnames';

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
