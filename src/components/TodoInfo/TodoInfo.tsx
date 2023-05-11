import { UserInfo, User } from '../UserInfo';

export type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: User | null,
};

type TodoProps = {
  todo: Todo,
};

export const TodoInfo = ({ todo }: TodoProps) => (
  <article
    className={
      todo.completed
        ? 'TodoInfo TodoInfo--completed'
        : 'TodoInfo'
    }
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
