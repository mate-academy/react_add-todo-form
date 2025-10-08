import cn from 'classnames';
import { UserInfo } from '../UserInfo';

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>
          <UserInfo user={todo.user} />
        </article>
      ))}
    </section>
  );
};
