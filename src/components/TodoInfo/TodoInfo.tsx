import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  user?: User | undefined;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {user ? <UserInfo user={user} /> : 'Unknown person'}
  </article>
);
