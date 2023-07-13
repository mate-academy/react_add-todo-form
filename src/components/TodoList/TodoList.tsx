import { TodoType } from '../../types/TodoType';
import { TodoInfo } from '../TodoInfo';

type TodoListProps  = {
  todos: TodoType[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
