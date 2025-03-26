import { UserInfo } from '../UserInfo';
import { Todo, User } from '../../types';

interface Props {
  todo: Todo;
  users: User[];
}

export const TodoInfo = ({ todo, users }: Props) => {
  const foundUser = users.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {foundUser ? <UserInfo user={foundUser} /> : null}
    </article>
  );
};
