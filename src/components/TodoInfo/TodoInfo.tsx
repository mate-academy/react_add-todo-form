import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo',
      { 'TodoInfo--completed': todo.completed })}
    key={todo.id}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <UserInfo user={todo.user} />
  </article>
);
