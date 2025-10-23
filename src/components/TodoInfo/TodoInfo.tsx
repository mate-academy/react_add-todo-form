import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/types.model';

interface IProps {
  todo: Todo;
}

export const TodoInfo: React.FC<IProps> = ({ todo }) => {
  return (
    <article
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
