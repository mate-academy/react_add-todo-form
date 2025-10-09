import { UserInfo } from '../UserInfo';

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
  user: User;
};

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const className = `TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`;

  return (
    <div className={className} data-id={todo.id}>
      <p className="TodoInfo__title">{todo.title}</p>
      <UserInfo user={todo.user} />
    </div>
  );
};
