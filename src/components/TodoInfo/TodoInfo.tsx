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
};

type Props = {
  todo: Todo;
  users: User[];
};

export const TodoInfo = ({ todo, users }: Props) => {
  const user = users.find(u => u.id === todo.userId);

  return (
    <section className="TodoList" data-cy="userSelect">
      <article
        data-id={todo.id}
        className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      >
        <h2 className="TodoInfo__title" data-cy="titleInput">
          {todo.title}
        </h2>
        {user && <UserInfo user={user} />}
      </article>
    </section>
  );
};
