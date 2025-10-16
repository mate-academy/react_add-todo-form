import { TodoInfo } from '../TodoInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: User | undefined;
  userId: number;
}

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  if (!todos || todos.length === 0) {
    return null;
  }

  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => {
        if (!todo.user) {
          return null;
        }

        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
