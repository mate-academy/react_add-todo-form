import { TodoInfo } from '../TodoInfo';
import { PreparedTodo } from '../types/preparedTodo';

type Props = {
  todos: PreparedTodo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: PreparedTodo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
