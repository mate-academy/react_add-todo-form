import { UserInfo } from '../UserInfo';
import { Todo, User } from '../../types/types';

type Props = {
  todo: Todo;
  users: User[];
};

export const TodoInfo = ({ todo, users }: Props) => {
  const person = users.find(user => user.id === todo.userId);

  return (
    <article key={todo.id} className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {person && <UserInfo user={person} />}
    </article>
  );
};
