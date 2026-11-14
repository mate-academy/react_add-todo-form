import { Todo } from '../../services/Todo';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

export const TodoInfo = ({ todo }: { todo: Todo }) => (
  <article
    data-id={todo.id}
    className={classNames(
      'TodoInfo',
      todo.completed ? 'TodoInfo--completed' : '',
    )}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
