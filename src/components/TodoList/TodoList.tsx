import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  maxId: number;
};

export const TodoList: React.FC<Props> = ({ todos, maxId }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} maxId={maxId} key={todo.id} />
    ))}
  </section>
);
