import { UserInfo } from '../UserInfo';
import type { User } from '../UserInfo';

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`.trim()}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
