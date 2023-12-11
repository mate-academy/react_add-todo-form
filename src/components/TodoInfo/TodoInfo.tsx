import cn from 'classnames';
import { TasksWithTodo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TasksWithTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={cn(
      'TodoInfo',
      { 'TodoInfo--completed': todo.completed },
    )}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <UserInfo user={todo.user} />
  </article>
);
