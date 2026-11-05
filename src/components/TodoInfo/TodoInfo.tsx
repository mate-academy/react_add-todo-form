import { UserInfo, type User } from '../UserInfo';

export type TodoFromServer = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type Todo = TodoFromServer & {
  user: User;
};

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
