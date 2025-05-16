import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}

interface Props {
  todos: Todo[];
}

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
