interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = todo.user;

  if (!user) {
    return <div className="TodoInfo">Usuário não encontrado</div>;
  }

  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h3 className="TodoInfo__title">{todo.title}</h3>
      <p className="UserInfo">{user.name}</p>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
};
