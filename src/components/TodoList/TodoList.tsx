import { Todos } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: Todos[];
};

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
