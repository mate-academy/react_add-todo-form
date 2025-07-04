import { Todo } from '../../api/todos';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  const user = usersFromServer.find(u => u.id === todo.userId);

  if (!user) {
    return (
      <article className="TodoInfo TodoInfo--error" data-id={todo.id}>
        <h2 className="TodoInfo__title">{todo.title}</h2>
        <span className="error">User not found</span>
      </article>
    );
  }

  return (
    <article
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
