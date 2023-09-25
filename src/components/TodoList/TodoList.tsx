import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';

type Props = {
  todos: Todos[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {
      todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))
    }
  </section>
);
