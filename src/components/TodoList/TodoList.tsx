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
  user?: User;
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
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
