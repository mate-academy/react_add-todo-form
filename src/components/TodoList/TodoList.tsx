import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoWithUser } from '../../types/todo';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo: TodoWithUser) => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
