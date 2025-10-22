import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number | string;
  title: string;
  completed: boolean;
};

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
