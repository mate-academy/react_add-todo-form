import { ToDoAggregate } from '../../domain/ToDoAggregate';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = { todos: ToDoAggregate[] };

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
