import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types/TodoType';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
