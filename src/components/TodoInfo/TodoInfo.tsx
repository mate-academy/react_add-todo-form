import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';
import { getNewTodoId } from '../../services/newId';

// Add the required props
type Props = {
  todo: Todo;
  todos: Todo[];
};
export const TodoInfo: React.FC<Props> = ({ todo, todos }) => (
  <article
    data-id={todo.id || getNewTodoId(todos)}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
