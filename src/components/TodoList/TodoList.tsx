import { TodoInfo } from '../TodoInfo';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id}></TodoInfo>;
      })}
    </section>
  );
};
