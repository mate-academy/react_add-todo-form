import classNames from 'classnames';
import { PreparedTodo } from '../../types/PreparedTodo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: PreparedTodo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user } = todo;

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};
