import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  newTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ newTodos }) => (
  <section className="TodoList">
    {newTodos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}

  </section>
);
