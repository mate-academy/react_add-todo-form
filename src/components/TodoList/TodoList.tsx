import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type TodosProps = {
  todos: Todo[]
};

export const TodoList: React.FC<TodosProps> = ({ todos }) => {
  return (
    <section className="todo-list">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
