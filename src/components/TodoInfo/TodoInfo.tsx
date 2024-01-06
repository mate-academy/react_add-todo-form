import { getUserById } from '../../services/UserByld';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo
      ${todo.completed && ('TodoInfo--completed')}`}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={getUserById(todo.userId)} />
    </article>
  );
};
