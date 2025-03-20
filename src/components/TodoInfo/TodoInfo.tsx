import { UserInfo } from '../UserInfo';
import { User, Todo } from '../../App';

interface Props {
  user: User;
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
