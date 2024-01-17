import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

interface Props {
  key: number;
  todo: TodoWithUser;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => (
  <article
    data-id={todo.id}
    className={
      classNames('TodoInfo',
        { 'TodoInfo--completed': todo.completed })
    }
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <UserInfo user={todo.user} />
  </article>
);
