import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo.user} />
  </article>
);
