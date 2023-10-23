import { TodoWithUser } from '../../types/TodoType';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id.toString()}
      className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
