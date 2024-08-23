import { UserInfo } from '../UserInfo';

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

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article data-id={todo.id} className="TodoInfo">
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user ? <UserInfo user={todo.user} /> : <span>User not found</span>}
    </article>
  );
};
