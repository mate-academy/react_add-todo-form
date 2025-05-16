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
  };
}

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} key={todo.id} />
    </article>
  );
};
