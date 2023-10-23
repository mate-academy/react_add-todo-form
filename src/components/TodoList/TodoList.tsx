import { TodoWithUser } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} />
    ))}
  </section>
);
