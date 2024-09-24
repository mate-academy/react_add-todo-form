import { UserInfo } from '../UserInfo';

interface User {
  name: string;
  email: string;
  id: number;
  username: string;
}

interface TodoI {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}

export const TodoInfo = ({ todo }: { todo: TodoI }) => (
  <article
    data-id="1"
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
