import { UserInfo } from '../UserInfo';
import { User } from '../UserInfo';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;

  user?: User;
};

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? `TodoInfo--completed` : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
