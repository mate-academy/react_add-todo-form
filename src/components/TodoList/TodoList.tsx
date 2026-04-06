import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    } | null;
    id: number;
    title: string;
    completed: boolean;
  }[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
