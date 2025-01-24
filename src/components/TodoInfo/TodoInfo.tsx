import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';
import { getNewTodoId } from '../../services/newId';
import todos from '../../api/todos';

// Add the required props
type Props = {
  todo: Todo;
};

export const TodoInfo:React.FC<Props> = ({ todo }) => (
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
