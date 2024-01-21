import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        const user = users.find((u) => u.id === todo.userId);

        if (user) {
          return (
            <article
              key={todo.id}
              className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
              data-id={todo.id}
            >
              <h2 className="TodoInfo__title">
                {todo.title}
              </h2>
              <a className="UserInfo" href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </article>
          );
        }

        return null;
      })}
    </section>
  );
};
