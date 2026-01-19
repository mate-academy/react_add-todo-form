import { UserInfo } from '../UserInfo';
import { getUserId } from '../../services/user';
import { Todo } from '../../services/types';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserId(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo?.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {<UserInfo user={user} />}
    </article>
  );
};
