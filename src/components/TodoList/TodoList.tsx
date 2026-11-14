import { Todo } from '../../services/Todo';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: { todos: Todo[] }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
