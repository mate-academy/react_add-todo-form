import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
};

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => {
        if (!todo.user) {
          return null;
        }

        return (
          <TodoInfo
            id={todo.id}
            title={todo.title}
            email={todo.user.email}
            name={todo.user.name}
            completed={todo.completed}
            key={todo.id}
          />
        );
      })}
    </section>
  );
};
