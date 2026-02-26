import { Todos } from '../../types/Todos';
import { Users } from '../../types/Users';
import { UserInfo } from '../UserInfo';

type TodoWithUser = Todos & {
  user: Users;
};

export const TodoInfo = ({ todo }: { todo: TodoWithUser }) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo.user} />
  </article>
);
