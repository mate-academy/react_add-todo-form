import { TodoAggregate } from '../../domain/TodoAggregate';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = { todos: TodoAggregate[] };

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
