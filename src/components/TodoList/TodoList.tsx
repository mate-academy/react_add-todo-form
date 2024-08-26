import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../interfaces';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} data-id={todo.id} />
    ))}
  </section>
);
