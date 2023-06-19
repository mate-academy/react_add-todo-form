import { ToDo } from '../../Types/ToDo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: ToDo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
