import { TodoInfo } from '../TodoInfo/TodoInfo';
import type { Todo } from '../TodoInfo/TodoInfo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
