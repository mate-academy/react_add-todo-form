import classNames from 'classnames';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo?.user} />
  </article>
);
