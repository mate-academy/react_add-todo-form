import { UserInfo } from '../UserInfo';

type User = {
  name: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
};

export const TodoInfo = ({ todo }: { todo: Todo }) => {
  return (
    <section className="TodoList">
      <article
        data-id={todo.id}
        className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>
        {todo.user && <UserInfo user={todo.user} />}
      </article>
    </section>
  );
};
