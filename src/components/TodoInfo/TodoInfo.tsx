import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

type TodoInfoProps = {
  todo: Todo;
};
export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
