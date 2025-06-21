import { UserInfo } from '../UserInfo/UserInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface TodoWithUser extends Todo {
  user: User;
}

export const TodoInfo = ({ todo }: { todo: TodoWithUser }) => {
  return (
    <article
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ' '}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} completed={todo.completed} />}
    </article>
  );
};
