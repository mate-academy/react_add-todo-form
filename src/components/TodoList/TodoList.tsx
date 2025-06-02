import { Todo } from '../services/interfaces';
import { TodoInfo } from '../TodoInfo';

type TodosProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodosProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
