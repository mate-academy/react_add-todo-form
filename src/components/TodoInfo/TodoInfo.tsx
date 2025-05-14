import { UserInfo } from '../UserInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
}

// export const TodoInfo = ({ todo }) => (
export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => (
  <article
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
