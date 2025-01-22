import { UserInfo } from '../UserInfo';

type User = {
  id: number;
  name: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
  user: User | null;
};

type Props = {
  todo: Todo;
  users: User[];
};

export const TodoInfo = ({ todo }: Props) => {
  const user = todo.user;

  return (
    <section className="TodoList">
      <article
        data-id={todo.id}
        className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>
        {user && <UserInfo user={user} />}
      </article>
    </section>
  );
};
