import { UserInfo } from '../UserInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h3 className="TodoInfo__title">{todo.title}</h3>

      <UserInfo user={todo.user} />
    </div>
  );
};
