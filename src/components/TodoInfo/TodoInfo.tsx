import cn from 'classnames';
import { findUsedById } from '../../services/findUsedById';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import todosFromServer from '../../api/todos';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const maxId = Math.max(...todosFromServer
    .map(selectedTodo => selectedTodo.id));

  const nextId = maxId + 1;
  const user = findUsedById(todo);

  return (
    <article
      data-id={nextId}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
