import { TodoWithUser } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: TodoWithUser[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
