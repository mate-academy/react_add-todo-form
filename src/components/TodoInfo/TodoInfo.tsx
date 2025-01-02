import { User } from '../../types';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({
  todo,
  user,
}: {
  todo: Todo;
  user?: User | undefined;
}) => {
  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user ? (
        <UserInfo user={user} />
      ) : (
        <p className="TodoInfo__error">User not found</p>
      )}
    </article>
  );
};
