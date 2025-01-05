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

  return (
    <section className="TodoList">
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
