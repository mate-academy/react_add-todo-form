
import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
// Add the required props
export const TodoInfo = ({ todo }) => (
  <article
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
