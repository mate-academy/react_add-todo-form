import { Todo, User } from '../../types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
  user?: User;
}

export const TodoInfo = ({ todo, user }: Props) => {
  const actualUser = user ?? todo.user;

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {actualUser && <UserInfo user={actualUser} />}
    </article>
  );
};
