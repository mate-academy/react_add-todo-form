import { UserInfo } from '../UserInfo';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface TodoInfoProps {
  todo: Todo;
  users: User[];
}
export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, users }) => {
  const user = users.find((u) => u.id === todo.userId);

  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && (
        <UserInfo userId={todo.userId} user={user} />
      )}
    </article>
  );
};
