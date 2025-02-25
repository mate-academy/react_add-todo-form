import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type User = {
  id: number;
  name: string;
  email: string;
};

type TodoListProps = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  const getUserById = (userId: number) =>
    users.find(user => user.id === userId);
  const maxId = Math.max(...todos.map(todo => todo.id), 1);

  return (
    <section className="TodoList" data-id={maxId + 1}>
      {todos.map(todo => {
        const user = getUserById(todo.userId);

        return (
          <TodoInfo
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            user={{
              name: user?.name || 'Empty',
              email: user?.email || '',
            }}
          />
        );
      })}
    </section>
  );
};
