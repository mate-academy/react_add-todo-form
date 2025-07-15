import { TodoInfo } from '../TodoInfo';
import { Task } from '../../types/Task';

export const TodoList = ({ todos }: { todos: Task[] }) => (
  <section className="mx-1 mt-4">
    {todos.map(todo => {
      return <TodoInfo todo={todo} key={todo.id} />;
    })}
  </section>
);
