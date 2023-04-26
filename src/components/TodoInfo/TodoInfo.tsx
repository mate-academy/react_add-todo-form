import classNames from 'classnames';
import { Todo } from '../../react-app-env';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo',
      { 'TodoInfo--completed': todo.completed })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <a className="UserInfo" href={todo.user?.email}>
      {todo.user?.name}
    </a>
  </article>
);
