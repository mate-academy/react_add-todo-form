import { TodoWithUser } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[]
};

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
