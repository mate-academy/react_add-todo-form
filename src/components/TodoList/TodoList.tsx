import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types';

interface Todos {
  todos: Todo[],
}

export const TodoList: React.FC<Todos> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        todo={todo}
        key={todo.id}
      />
    ))}
  </section>
);
