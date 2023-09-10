import Todo from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: Todo[]
};

export const TodoList = ({ todos } : TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} />
      ))}
    </section>
  );
};
