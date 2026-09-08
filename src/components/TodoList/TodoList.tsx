import { TodoMerged } from '../../types/TodoMerged';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: { todos: TodoMerged[] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
