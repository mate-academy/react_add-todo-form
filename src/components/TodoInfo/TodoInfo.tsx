import { UserInfo } from '../UserInfo';
import { User } from '../UserInfo';

export type Todo = {
  title: string;
  user: User;
  id: number;
  completed: boolean;
};

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? `TodoInfo--completed` : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
