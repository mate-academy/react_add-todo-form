import { TodoWithUser } from '../../entities/TodoWithUser';
import { TodoInfo } from '../TodoInfo/TodoInfo';

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
