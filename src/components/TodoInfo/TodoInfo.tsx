import { UserInfo } from '../UserInfo/UserInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
};

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const completedClass = todo.completed ? ' TodoInfo--completed' : '';

  return (
    <article className={`TodoInfo${completedClass}`} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
