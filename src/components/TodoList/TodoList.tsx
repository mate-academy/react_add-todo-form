import { UnifiedTodo } from '../../types/Types';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: UnifiedTodo[];
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
