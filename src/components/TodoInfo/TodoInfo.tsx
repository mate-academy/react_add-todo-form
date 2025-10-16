import { UserInfo } from '../UserInfo';
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
  user: User | undefined;
}

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  if (!todo.user) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
