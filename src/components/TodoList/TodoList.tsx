import { TodoAggregated } from '../../domain/TodoAggreaged';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: TodoAggregated[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
