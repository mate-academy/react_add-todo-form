import { TodoAggregate } from '../../types/TodoAggregate';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoAggregate[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
