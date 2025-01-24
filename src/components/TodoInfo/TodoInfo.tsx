import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';

// Add the required props
function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));
  return maxId + 1;
}
export const TodoInfo = ({ todo }) => (
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
