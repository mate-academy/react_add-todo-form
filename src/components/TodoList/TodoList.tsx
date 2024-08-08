import { TodoInfo } from '../TodoInfo';
import { TodoListProps } from '../../services/types';
import { PreparedTodo } from '../../services/types';

export const TodoList: React.FC<TodoListProps> = ({
  todos,
}: {
  todos: PreparedTodo[];
}) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <div key={todo.id}>
          <TodoInfo todo={todo} />
        </div>
      ))}
    </section>
  );
};
