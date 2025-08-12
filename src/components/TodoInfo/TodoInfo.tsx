import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type TodoWithUser = Todo & { user?: User };

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
