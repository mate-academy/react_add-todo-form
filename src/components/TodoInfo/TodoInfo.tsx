import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoUser } from '../../types/TodosUser';

type Props = {
  todo: TodoUser
};

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </article>
  );
};
