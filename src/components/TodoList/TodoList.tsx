import { TodoInfo } from '../TodoInfo';
interface TodoListProps {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
    user?: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  }[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} data-id={todo.id} key={todo.id} />
      ))}
    </section>
  );
};
