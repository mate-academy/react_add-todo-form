import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
