import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

interface Props {
  OnTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ OnTodos }) => (
  <section className="TodoList">
    {OnTodos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
