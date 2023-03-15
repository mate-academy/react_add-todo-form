import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todo';

type Todos = {
  todos: Todo[];
};
export const TodoList = ({ todos } : Todos) => (
  <ul>
    {todos.map(todo => (
      <li data-id={todo.id} className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>

);
