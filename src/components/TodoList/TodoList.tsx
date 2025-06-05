export type User = {
  id: number;
  name: string;
  email: string;
  todos?: Todo[];
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
  user?: User;
};

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>
          {todo.user && (
            <a className="UserInfo" href="mailto:Sincere@april.biz">
              {todo.user.name}
            </a>
          )}
        </article>
      ))}
    </section>
  );
};
