import { Todo, User } from '../services';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ user, todo }: { user: User; todo: Todo }) => {
  return (
    <article data-id={todo.id} className="TodoInfo">
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
