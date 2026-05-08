import { PreparedTodo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
