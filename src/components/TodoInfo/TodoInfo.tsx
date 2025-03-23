import { Task } from '../../services/types';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Task;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      id={`${todo.id}`}
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
