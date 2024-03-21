import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

// Add the required types and props
type TodoInfoProps = {
  todo: Todo & { user: User };
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  todo: { title, completed, user },
}) => (
  <article className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
    <h2 className="TodoInfo__title">{title}</h2>
    {user && <UserInfo user={user} />}
  </article>
);
