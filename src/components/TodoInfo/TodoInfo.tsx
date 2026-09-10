import { UserInfo, User } from '../UserInfo';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
