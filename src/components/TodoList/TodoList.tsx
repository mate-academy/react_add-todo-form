import { Todo } from '../services';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
