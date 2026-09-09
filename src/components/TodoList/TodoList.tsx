import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
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
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
