type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todo: Todo;
  user: User;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <article data-id={todo.id} className="TodoInfo ">
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={user.email}>
        {user.name}
      </a>
    </article>
  );
};
