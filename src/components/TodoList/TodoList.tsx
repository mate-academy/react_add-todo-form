import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/TodosProps';

type TodosProps = {
  todos: Todo[]
};

export const TodoList: React.FC<TodosProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
