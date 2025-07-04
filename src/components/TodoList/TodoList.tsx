import { Todo } from '../../api/todos';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <section>
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
