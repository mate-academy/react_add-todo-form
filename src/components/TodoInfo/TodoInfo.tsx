import { Todo } from '../../services/Todos';
import { UserInfo } from '../UserInfo/UserInfo';
import { User } from '../../services/User';

export const TodoInfo = ({ todo, user }: { todo: Todo; user: User }) => (
  <article data-id="1" className="TodoInfo TodoInfo--completed">
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={user} />
  </article>
);
