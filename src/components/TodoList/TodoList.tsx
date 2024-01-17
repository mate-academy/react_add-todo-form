import { TodoInfo } from '../TodoInfo';

type PrepareTodo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number
  user?: {
    id: number,
    name: string,
    username: string,
    email: string
  },
};

type Props = {
  todos: PrepareTodo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: PrepareTodo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
