import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const searcUser: User = usersFromServer.find(user => user.id === todo.userId)!;

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={searcUser} />
    </article>
  );
};
