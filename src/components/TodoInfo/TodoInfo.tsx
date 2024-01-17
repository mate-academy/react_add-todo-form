import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
  key: number;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id="1"
    className={classNames(
      'TodoInfo',
      { 'TodoInfo--completed': todo.completed },
    )}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <UserInfo user={todo.user} />
  </article>
);
