import { TodoAggregate } from '../../entities/todo/domain/TodoAggregate';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type TodoListProps = {
  todos: TodoAggregate[];
};

export function TodoList({ todos }: TodoListProps) {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
}
