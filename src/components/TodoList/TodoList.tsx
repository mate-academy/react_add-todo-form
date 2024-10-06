import { Todo } from '../../interfaces/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  visibleTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ visibleTodos }) => (
  <section className="TodoList">
    {visibleTodos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
