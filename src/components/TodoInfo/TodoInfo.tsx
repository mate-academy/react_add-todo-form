import { Todos } from '../../Types/Todos';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

interface Props {
  todo: Todos;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
