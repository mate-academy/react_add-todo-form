export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todo, index) => (
        <article
          key={index}
          data-id={todo.id}
          className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <a
            className="UserInfo"
            href={`mailto:${users.find(user => user.id === todo.userId)?.email}`}
          >
            {users.find(user => user.id === todo.userId)?.name}
          </a>
        </article>
      ))}
    </section>
  );
};
