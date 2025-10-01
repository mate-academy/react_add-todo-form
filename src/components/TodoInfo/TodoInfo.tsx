import { UserInfo } from '../UserInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo '}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
