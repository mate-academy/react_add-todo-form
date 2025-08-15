import { Todo } from '../../type/Todo';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
