import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
);
