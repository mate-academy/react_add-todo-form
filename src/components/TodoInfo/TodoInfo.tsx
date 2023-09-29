import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article className={cn(
      'TodoInfo',
      {
        'TodoInfo--completed': todo.completed,
      },
    )}
    data-id={todo.id} // Add data-id attribute with the todo's id
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.userId && todo.user && (
        <div className="TodoInfo__user">
          <UserInfo user={todo.user} />
        </div>
      )}
    </article>
  );
};
